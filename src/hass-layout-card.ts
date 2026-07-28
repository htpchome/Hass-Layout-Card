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

  static get styles(): CSSResultGroup {
    return cardStyles;
  }

  /**
   * Returns the configuration element for the card editor
   */
  static getConfigElement(): HTMLElement {
    return document.createElement('hass-layout-card-editor');
  }

  /**
   * Returns default configuration for the card
   */
  static getStubConfig(): HassLayoutCardConfig {
    return { ...DEFAULT_CONFIG };
  }

  /**
   * Sets the Home Assistant state object
   */
  public set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  /**
   * Gets the Home Assistant state object
   */
  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  /**
   * Validates and stores the user configuration
   */
  public setConfig(config: HassLayoutCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Returns the card size for layout calculations
   */
  public getCardSize(): number {
    return 3;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._startDateTimeUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
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
        Footer
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

// Register the card with Home Assistant
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

// Add card to custom cards registry
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG_NAME,
  name: 'Layout Card',
  description: 'A custom layout card with header, content area, and footer',
  preview: true,
});

// Log version info
console.info(
  `%c HASS-LAYOUT-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: bold;',
  'color: #03a9f4; background: white; font-weight: bold;'
);