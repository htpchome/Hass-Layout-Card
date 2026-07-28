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
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
    this._teardownScrollFix();
  }

  private _setupScrollFix(): void {
    this._scrollHandler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollY <= 0) {
        this._wasAtTop = true;
      }
      
      if (scrollY === 0 && this._wasAtTop) {
        this._wasAtTop = false;
        this._scheduleLayoutRecovery();
      }
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });

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
      
      if (dy > 40 && scrollY <= 0) {
        this._scheduleLayoutRecovery(1500);
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

  private _scheduleLayoutRecovery(delay = 500): void {
    if (this._recoveryTimer) {
      clearTimeout(this._recoveryTimer);
    }
    
    this._recoveryTimer = setTimeout(() => this._fixCardTransforms(), delay);
    setTimeout(() => this._fixCardTransforms(), delay + 300);
    setTimeout(() => this._fixCardTransforms(), delay + 600);
  }

  /**
   * Fixes stale CSS transforms on Lovelace cards caused by iOS pull-to-refresh.
   * 
   * Lovelace uses transform: translate(x, y) on card containers to position
   * them in the masonry layout. After iOS pull-to-refresh pushes content down
   * and then back up, these transforms are stale and cause empty space above
   * the cards. We fix this by temporarily clearing all transforms, which
   * triggers the masonry layout to recalculate correct positions.
   */
  private _fixCardTransforms(): void {
    const masonryView = this._findMasonryView();
    if (!masonryView) return;

    // Find all elements with transform:translate that are card containers
    // These are typically divs inside the masonry view
    const allElements = masonryView.querySelectorAll<HTMLElement>('*');
    const transformedElements: Array<{ el: HTMLElement; transform: string }> = [];
    
    for (const el of allElements) {
      const transform = el.style.transform;
      if (transform && transform.includes('translate')) {
        transformedElements.push({ el, transform });
      }
    }

    if (transformedElements.length === 0) {
      // No transforms to fix, try resize event instead
      this._triggerResize();
      return;
    }

    // Step 1: Save and clear all transforms simultaneously
    for (const { el } of transformedElements) {
      el.style.transform = '';
    }

    // Step 2: Force a synchronous reflow so browser sees elements without transforms
    void masonryView.offsetHeight;

    // Step 3: Restore transforms on next frame so masonry layout recalculates them
    requestAnimationFrame(() => {
      for (const { el, transform } of transformedElements) {
        el.style.transform = transform;
      }

      // Step 4: After restore, trigger another reflow and resize event
      requestAnimationFrame(() => {
        void masonryView.offsetHeight;
        this._triggerResize();
      });
    });
  }

  /**
   * Triggers resize events to force Lovelace to recalculate layout
   */
  private _triggerResize(): void {
    window.dispatchEvent(new Event('resize'));
    
    // Also force re-render of this card
    void this.offsetHeight;
    void this.getBoundingClientRect();
    this.requestUpdate();
  }

  /**
   * Finds the masonry/grid view element that manages card layout
   */
  private _findMasonryView(): HTMLElement | null {
    const selectors = [
      'hui-masonry-view',
      'hui-panel-view',
      'hui-view',
      'hui-sections-view',
    ];
    
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) return el as HTMLElement;
    }
    
    const haEl = document.querySelector('home-assistant');
    if (haEl?.shadowRoot) {
      for (const selector of selectors) {
        const el = haEl.shadowRoot.querySelector(selector);
        if (el) return el as HTMLElement;
      }
    }
    
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