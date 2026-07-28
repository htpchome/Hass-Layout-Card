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
  private _scrollHandler?: () => void;
  private _touchStartY = 0;
  private _touchActive = false;
  private _wasAtTop = false;
  private _recoveryTimer?: ReturnType<typeof setTimeout>;
  private _resizeObserver?: ResizeObserver;

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
    this._setupScrollFix();
    this._setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
    this._teardownScrollFix();
    this._teardownResizeObserver();
  }

  /**
   * iOS pull-to-refresh fix:
   * 
   * When pull-to-refresh happens on iOS companion app, the WKWebView's
   * viewport temporarily shifts as the native spinner appears at the top.
   * Home Assistant's sections view (CSS Grid layout) calculates card positions
   * during this shift. After the spinner disappears and the viewport returns to
   * normal, the sections view retains stale position calculations, leaving
   * empty space between the header and cards.
   * 
   * The fix: Detect when pull-to-refresh completes and force the sections
   * view to recalculate its grid layout.
   */
  private _setupScrollFix(): void {
    this._scrollHandler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollY <= 0) {
        this._wasAtTop = true;
      }
      
      // Scroll returned to zero after being pulled - refresh completed
      if (scrollY === 0 && this._wasAtTop) {
        this._wasAtTop = false;
        this._scheduleSectionsRecalculate();
      }
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });

    // Touch gesture detection for pull-to-refresh
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
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Pull-down gesture at top of page = likely refresh
      if (dy > 40 && scrollY <= 0) {
        // Wait for refresh spinner to finish, then recalculate
        this._scheduleSectionsRecalculate(1500);
      }
    };

    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchend', touchEnd, { passive: true });

    this._teardownScrollFix = () => {
      window.removeEventListener('scroll', this._scrollHandler!);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
      if (this._recoveryTimer) {
        clearTimeout(this._recoveryTimer);
      }
    };
  }

  /**
   * Sets up a ResizeObserver on the sections view to detect layout changes
   */
  private _setupResizeObserver(): void {
    const sectionsView = this._findSectionsView();
    if (!sectionsView) return;

    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Any height change in the sections view that's more than 1px
        // could indicate the header shifted and the grid needs recalculation
        if (Math.abs(entry.contentRect.height - (entry.target as HTMLElement).offsetHeight) > 1) {
          this._triggerSectionsRecalculate();
        }
      }
    });

    this._resizeObserver.observe(sectionsView);
  }

  private _teardownResizeObserver(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  /**
   * Schedule staggered recalculation attempts to catch the right timing
   * after the iOS refresh spinner disappears
   */
  private _scheduleSectionsRecalculate(delay = 500): void {
    if (this._recoveryTimer) {
      clearTimeout(this._recoveryTimer);
    }
    
    // Multiple attempts at different delays to catch the header repositioning
    this._recoveryTimer = setTimeout(() => this._triggerSectionsRecalculate(), delay);
    setTimeout(() => this._triggerSectionsRecalculate(), delay + 300);
    setTimeout(() => this._triggerSectionsRecalculate(), delay + 600);
  }

  /**
   * Forces the sections view to recalculate its CSS Grid layout.
   * 
   * In sections view, cards are positioned using CSS Grid. The grid shouldn't
   * need explicit recalculation since it's flow-based (auto-placement). But
   * if the viewport shifts during iOS refresh and section sizing is cached,
   * we need to force a recalculation.
   */
  private _triggerSectionsRecalculate(): void {
    const sectionsView = this._findSectionsView();
    
    if (sectionsView) {
      // Force the sections view to remeasure and relayout by toggling
      // a CSS property that affects grid behavior
      const originalGap = sectionsView.style.gap || 
                          getComputedStyle(sectionsView).gap;
      
      if (originalGap) {
        // Toggle grid gap to force grid recalculation
        const gapValue = parseFloat(originalGap);
        sectionsView.style.gap = (gapValue + 0.1) + 'px';
        void sectionsView.offsetHeight; // Force sync reflow
        sectionsView.style.gap = originalGap;
      } else {
        // Fallback: toggle visibility to force reflow
        const originalVisibility = sectionsView.style.visibility;
        sectionsView.style.visibility = 'hidden';
        void sectionsView.offsetHeight;
        sectionsView.style.visibility = originalVisibility;
      }

      // Force reflow again after restore
      void sectionsView.offsetHeight;
      void sectionsView.getBoundingClientRect();
    }

    // Dispatch resize - HA's frontend listens for this
    window.dispatchEvent(new Event('resize'));

    // Force re-render of this card
    void this.offsetHeight;
    void this.getBoundingClientRect();
    this.requestUpdate();

    // Additional resize after a short delay for any async layout
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      void this.offsetHeight;
      this.requestUpdate();
    }, 100);
  }

  /**
   * Finds the sections view element (hui-sections-view)
   */
  private _findSectionsView(): HTMLElement | null {
    // Direct selector for sections view
    let el: HTMLElement | null = document.querySelector('hui-sections-view');
    if (el) return el;

    // Try shadow DOM of home-assistant
    const haEl = document.querySelector('home-assistant');
    if (haEl?.shadowRoot) {
      el = haEl.shadowRoot.querySelector('hui-sections-view');
      if (el) return el;

      // Dig deeper into nested shadow DOM
      const allElements = haEl.shadowRoot.querySelectorAll('*');
      for (const element of allElements) {
        if ((element as HTMLElement).shadowRoot) {
          el = (element as HTMLElement).shadowRoot!.querySelector('hui-sections-view');
          if (el) return el;
        }
      }
    }

    // Fallback: try panel or view
    el = document.querySelector('hui-panel-view');
    if (el) return el;
    
    el = document.querySelector('hui-view');
    if (el) return el;

    return null;
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

  private _teardownScrollFix(): void {
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