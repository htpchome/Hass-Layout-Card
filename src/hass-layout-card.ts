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
  private _animationFrameId?: number;
  private _lastHeaderY = 0;
  private _headerPushedDown = false;
  private _recoveryAttempts = 0;

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
    this._startHeaderMonitor();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
    this._stopHeaderMonitor();
  }

  /**
   * Monitors the HA header position to detect iOS pull-to-refresh spinner.
   * 
   * When the iOS WKWebView pull-to-refresh spinner appears, it pushes the
   * entire WebView down, including the HA header. When the spinner disappears,
   * the header moves back up. We detect both transitions:
   *   - Header moves down => spinner appeared (mark state, cards about to misrender)
   *   - Header moves back up => spinner gone (trigger fix)
   */
  private _startHeaderMonitor(): void {
    // Initialize baseline - get current header Y position
    this._lastHeaderY = this._getHeaderY();

    const check = () => {
      const currentY = this._getHeaderY();
      const delta = currentY - this._lastHeaderY;

      // Header pushed down significantly => spinner just appeared
      if (delta > 10 && !this._headerPushedDown) {
        this._headerPushedDown = true;
      }

      // Header moved back up after being pushed down => spinner gone
      if (delta < -5 && this._headerPushedDown) {
        this._headerPushedDown = false;
        this._recoveryAttempts = 0;
        // Give the layout a moment to settle, then fix
        setTimeout(() => this._recoverCardPosition(), 50);
      }

      this._lastHeaderY = currentY;
      this._animationFrameId = requestAnimationFrame(check);
    };

    this._animationFrameId = requestAnimationFrame(check);
  }

  private _stopHeaderMonitor(): void {
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
  }

  /**
   * Gets the current Y position of the HA header element.
   * Tries multiple methods to locate the HA top bar / app-header.
   */
  private _getHeaderY(): number {
    // Strategy 1: ha-menu-button (the hamburger) is always in the header
    const menuBtn = document.querySelector('ha-menu-button');
    if (menuBtn) return menuBtn.getBoundingClientRect().top;

    // Strategy 2: app-header or app-toolbar
    let header = document.querySelector('app-header, app-toolbar');
    if (header) return header.getBoundingClientRect().top;

    // Strategy 3: Shadow DOM of home-assistant
    const haEl = document.querySelector('home-assistant') as HTMLElement | null;
    if (haEl?.shadowRoot) {
      // Try direct query
      header = haEl.shadowRoot.querySelector('app-header, app-toolbar, ha-menu-button, ha-app-layout [slot="app-header"]');
      if (header) return header.getBoundingClientRect().top;

      // Walk all elements with shadow roots
      const allEls = haEl.shadowRoot.querySelectorAll('*');
      for (const el of allEls) {
        const htmlEl = el as HTMLElement;
        if (htmlEl.shadowRoot) {
          header = htmlEl.shadowRoot.querySelector('app-header, app-toolbar, ha-menu-button');
          if (header) return header.getBoundingClientRect().top;
        }
      }
    }

    // Strategy 4: Any fixed/positioned element at the top
    const topElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
    for (const el of topElements) {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top >= 0 && rect.top < 60 && rect.height > 20) {
        return rect.top;
      }
    }

    // Strategy 5: VisualViewport offset - when iOS pushes content down,
    // the visualViewport offsetTop changes
    if (window.visualViewport) {
      return window.visualViewport.offsetTop;
    }

    return 0;
  }

  /**
   * Recovers card position after the iOS refresh spinner disappears.
   * 
   * The sections view grid calculated card positions while the header was
   * pushed down. Now that the header is back up, we need to force the
   * grid to recalculate with the correct header position.
   */
  private _recoverCardPosition(): void {
    // Method 1: Force a global resize - HA sections view recalculates on resize
    window.dispatchEvent(new Event('resize'));

    // Method 2: Force the entire document to reflow
    // This makes the browser recalculate all CSS Grid positions
    const htmlEl = document.documentElement;
    const origDisplay = htmlEl.style.display;
    htmlEl.style.display = 'none';
    void htmlEl.offsetHeight;     // Force sync reflow
    htmlEl.style.display = origDisplay;
    void htmlEl.offsetHeight;     // Force another reflow after restore

    // Method 3: Force this card to re-render
    void this.offsetHeight;
    void this.getBoundingClientRect();
    this.requestUpdate();

    // Method 4: Staggered resize events to catch async layout
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      
      requestAnimationFrame(() => {
        void this.offsetHeight;
        void this.getBoundingClientRect();
        this.requestUpdate();
      });
    });

    // Method 5: Retry up to 3 times if header still misaligned
    setTimeout(() => {
      if (this._recoveryAttempts < 3) {
        this._recoveryAttempts++;
        // Check if fix actually worked by comparing header and card positions
        const headerY = this._getHeaderY();
        // Approximate header height is 56px (--header-height)
        const expectedCardTop = headerY + 56;
        const cardRect = this.getBoundingClientRect();
        
        // If card is more than 20px below expected position, retry
        if (cardRect.top > expectedCardTop + 20) {
          this._recoverCardPosition();
        }
      }
    }, 100);
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