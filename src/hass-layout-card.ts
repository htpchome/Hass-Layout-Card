/**
 * Hass Layout Card - Main Card Component
 * A custom Home Assistant Lovelace card with header, content, and footer layout
 */
import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { HassLayoutCardConfig, HomeAssistant } from './types';
import { cardStyles } from './styles';
import { CARD_TAG_NAME, CARD_VERSION, DEFAULT_CONFIG, DATETIME_FORMATS } from './constants';
import './editor';

@customElement(CARD_TAG_NAME)
export class HassLayoutCard extends LitElement {
  @state() private _config?: HassLayoutCardConfig;
  @state() private _currentDateTime = new Date();
  private _dateTimeInterval?: ReturnType<typeof setInterval>;
  private _hass?: HomeAssistant;
  private _touchStartY = 0;
  private _touchActive = false;
  private _recoveryTimer?: ReturnType<typeof setTimeout>;
  private _resizeHandler?: () => void;
  private _lastInnerHeight = 0;

  static get styles(): CSSResultGroup {
    return cardStyles;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('hass-layout-card-editor');
  }

  static getStubConfig(): HassLayoutCardConfig {
    return { ...DEFAULT_CONFIG };
  }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public setConfig(config: HassLayoutCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._startDateTimeUpdate();
    this._setupViewportFix();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
    this._teardownViewportFix();
  }

  /**
   * iOS pull-to-refresh fix for HA Sections view.
   * 
   * In WKWebView, pull-to-refresh does NOT scroll the page - it physically
   * shifts the WebView viewport down, changing window.innerHeight.
   * 
   * 1. User pulls down -> native spinner appears -> viewport shrinks
   * 2. Cards calculate positions with reduced innerHeight 
   * 3. Spinner disappears -> viewport expands back -> header moves up
   * 4. Cards retain stale positions from step 2 -> empty space above cards
   * 
   * Fix: Monitor window.innerHeight for changes and force HA's layout engine
   * to recalculate via resize events and DOM manipulation.
   */
  private _setupViewportFix(): void {
    this._lastInnerHeight = window.innerHeight;

    // Watch for viewport height changes (pull-to-refresh causes these)
    this._resizeHandler = () => {
      const currentHeight = window.innerHeight;
      
      // Height changed by more than a few px = viewport shift
      if (Math.abs(currentHeight - this._lastInnerHeight) > 10) {
        this._lastInnerHeight = currentHeight;
        // Schedule recalculation after viewport stabilizes
        this._scheduleRecoveryAfterViewportChange();
      }
    };
    window.addEventListener('resize', this._resizeHandler);

    // Touch gesture detection as backup trigger
    const touchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        this._touchStartY = e.touches[0].clientY;
        this._touchActive = true;
      }
    };

    const touchEnd = (e: TouchEvent) => {
      if (!this._touchActive) return;
      this._touchActive = false;
      const dy = e.changedTouches[0].clientY - this._touchStartY;
      
      // Pull-down > 40px at top of page
      if (dy > 40 && window.scrollY <= 0) {
        this._scheduleRecoveryAfterViewportChange(1500);
      }
    };

    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchend', touchEnd, { passive: true });

    this._teardownViewportFix = () => {
      window.removeEventListener('resize', this._resizeHandler!);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
      if (this._recoveryTimer) {
        clearTimeout(this._recoveryTimer);
      }
    };
  }

  /**
   * Schedule staggered recovery attempts after viewport change.
   * We use multiple delays because we don't know exactly when the
   * iOS spinner animation will complete.
   */
  private _scheduleRecoveryAfterViewportChange(delay = 800): void {
    if (this._recoveryTimer) {
      clearTimeout(this._recoveryTimer);
    }
    
    this._recoveryTimer = setTimeout(() => this._forceGlobalRelayout(), delay);
    setTimeout(() => this._forceGlobalRelayout(), delay + 300);
    setTimeout(() => this._forceGlobalRelayout(), delay + 600);
  }

  /**
   * Forces HA's entire layout engine to recalculate.
   * 
   * Since we can't directly access the shadow-DOM-enclosed sections view,
   * we use several indirect methods to trigger a full layout recalculation:
   * 
   * 1. Dispatch 'resize' - HA listens for window resize events
   * 2. Toggle html style to force reflow on the entire document
   * 3. Access internals via any reachable HA API
   * 4. Force this card to re-render
   */
  private _forceGlobalRelayout(): void {
    // Method 1: Dispatch resize event - HA listens for these
    window.dispatchEvent(new Event('resize'));

    // Method 2: Force reflow at the document level by toggling a layout property
    // This forces the browser to recalculate CSS Grid for all elements
    const html = document.documentElement;
    const origOverflow = html.style.overflow || getComputedStyle(html).overflow;
    html.style.overflow = 'hidden';
    void html.offsetHeight;
    html.style.overflow = origOverflow;

    // Method 3: Try to access HA internals via the global customCards registry
    // and any reachable API on the home-assistant element
    const haEl = document.querySelector('home-assistant') as HTMLElement | null;
    if (haEl) {
      // Force reflow on the home-assistant element
      void haEl.offsetHeight;
      void haEl.getBoundingClientRect();

      // Try to call any resize/layout method exposed on the element
      if (typeof (haEl as any).notifyResize === 'function') {
        (haEl as any).notifyResize();
      }
      
      // Dispatch resize event into the shadow DOM
      if (haEl.shadowRoot) {
        haEl.shadowRoot.dispatchEvent(new Event('resize', { bubbles: true, composed: true }));
      }
    }

    // Method 4: Force reflow and re-render of this card
    void this.offsetHeight;
    void this.getBoundingClientRect();
    this.requestUpdate();

    // Method 5: Additional animations to force visual update
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      
      requestAnimationFrame(() => {
        void this.offsetHeight;
        this.requestUpdate();
      });
    });

    // Method 6: Try to access sections view through shadow DOM traversal
    // Even though it's in shadow DOM, we can traverse into it
    this._traverseShadowAndTriggerResize(document.body);
  }

  /**
   * Recursively traverses shadow DOM and dispatches resize events
   * to ensure all components get the notification
   */
  private _traverseShadowAndTriggerResize(root: HTMLElement | ShadowRoot): void {
    // Dispatch resize to this root
    root.dispatchEvent(new Event('resize', { bubbles: true, composed: true }));

    // Force reflow on any matching custom elements
    const allElements = root.querySelectorAll('*');
    for (const el of allElements) {
      const htmlEl = el as HTMLElement;
      const tagName = htmlEl.tagName.toLowerCase();
      // Force reflow on sections view and related elements
      if (
        tagName === 'hui-sections-view' ||
        tagName === 'hui-view' ||
        tagName === 'hui-root-view' ||
        tagName === 'ha-panel-lovelace'
      ) {
        void htmlEl.offsetHeight;
        void htmlEl.getBoundingClientRect();

        // Notify any custom element API
        if (typeof (htmlEl as any).notifyResize === 'function') {
          (htmlEl as any).notifyResize();
        }
      }

      // Recurse into shadow roots
      if (htmlEl.shadowRoot) {
        this._traverseShadowAndTriggerResize(htmlEl.shadowRoot);
      }
    }
  }

  private _startDateTimeUpdate(): void {
    this._currentDateTime = new Date();
    this._dateTimeInterval = setInterval(() => {
      this._currentDateTime = new Date();
    }, 1000);
  }

  private _stopDateTimeUpdate(): void {
    if (this._dateTimeInterval) {
      clearInterval(this._dateTimeInterval);
      this._dateTimeInterval = undefined;
    }
  }

  private _teardownViewportFix(): void {
    if (this._recoveryTimer) {
      clearTimeout(this._recoveryTimer);
    }
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`
        <ha-card>
          <div class="card-content">
            <p>Please configure this card.</p>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderContent()}
        ${this._renderFooter()}
      </ha-card>
    `;
  }

  private _renderHeader(): TemplateResult {
    const title = this._config?.title || '';
    const subtitle = this._config?.subtitle || '';
    const showDateTime = this._config?.show_datetime !== false;

    return html`
      <div class="card-header">
        ${title ? html`<h2 class="card-title">${title}</h2>` : ''}
        ${subtitle ? html`<p class="card-subtitle">${subtitle}</p>` : ''}
        ${showDateTime ? html`<div class="card-datetime">${this._formatDateTime()}</div>` : ''}
      </div>
    `;
  }

  private _renderContent(): TemplateResult {
    const content = this._config?.content || '';

    return html`
      <div class="card-content">
        ${unsafeHTML(content)}
      </div>
    `;
  }

  private _renderFooter(): TemplateResult {
    return html`
      <div class="card-footer">
        <span>Footer</span>
        <span class="card-version">v${CARD_VERSION}</span>
      </div>
    `;
  }

  private _formatDateTime(): string {
    const format = this._config?.datetime_format || 'default';
    const formatOptions = DATETIME_FORMATS[format as keyof typeof DATETIME_FORMATS] || DATETIME_FORMATS.default;
    
    const dateStr = this._currentDateTime.toLocaleDateString(
      this.hass?.language || 'en-US',
      formatOptions.date
    );
    const timeStr = this._currentDateTime.toLocaleTimeString(
      this.hass?.language || 'en-US',
      formatOptions.time
    );

    return `${dateStr} - ${timeStr}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG_NAME]: HassLayoutCard;
  }

  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG_NAME,
  name: 'Layout Card',
  description: 'A custom layout card with header, content area, and footer',
  preview: true,
});

console.info(
  `%c HASS-LAYOUT-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: bold;',
  'color: #03a9f4; background: white; font-weight: bold;'
);