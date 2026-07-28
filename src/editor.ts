/**
 * Visual Configuration Editor for Hass Layout Card
 */
import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HassLayoutCardConfig, HomeAssistant } from './types';
import { cardStyles } from './styles';
import { EDITOR_TAG_NAME, DEFAULT_CONFIG, DATETIME_FORMATS } from './constants';

@customElement(EDITOR_TAG_NAME)
export class HassLayoutCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: HassLayoutCardConfig;

  static get styles(): CSSResultGroup {
    return cardStyles;
  }

  public setConfig(config: HassLayoutCardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  protected render() {
    if (!this._config) {
      return html`<div class="editor-container">Loading...</div>`;
    }

    const formatOptions = Object.keys(DATETIME_FORMATS).map(
      (key) => html`
        <option value="${key}" ?selected=${this._config?.datetime_format === key}>
          ${key.charAt(0).toUpperCase() + key.slice(1)}
        </option>
      `
    );

    return html`
      <div class="editor-container">
        <div class="editor-field">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            .value=${this._config.title || ''}
            @input=${this._handleTitleChange}
            placeholder="Enter card title"
          />
        </div>

        <div class="editor-field">
          <label for="subtitle">Subtitle</label>
          <input
            id="subtitle"
            type="text"
            .value=${this._config.subtitle || ''}
            @input=${this._handleSubtitleChange}
            placeholder="Enter card subtitle (optional)"
          />
        </div>

        <div class="editor-field">
          <div class="checkbox-wrapper">
            <input
              id="show_datetime"
              type="checkbox"
              .checked=${this._config.show_datetime !== false}
              @change=${this._handleShowDatetimeChange}
            />
            <label for="show_datetime">Show Date/Time</label>
          </div>
        </div>

        <div class="editor-field">
          <label for="datetime_format">Date/Time Format</label>
          <select
            id="datetime_format"
            .value=${this._config.datetime_format || 'default'}
            @change=${this._handleDatetimeFormatChange}
          >
            ${formatOptions}
          </select>
        </div>

        <div class="editor-field">
          <label for="content">Content (HTML)</label>
          <textarea
            id="content"
            .value=${this._config.content || ''}
            @input=${this._handleContentChange}
            placeholder="<p>Your HTML content here</p>"
          ></textarea>
          <div class="editor-help">
            Enter HTML markup for the main content area. Supports standard HTML tags.
          </div>
        </div>
      </div>
    `;
  }

  private _handleTitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ title: target.value });
  }

  private _handleSubtitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ subtitle: target.value });
  }

  private _handleShowDatetimeChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ show_datetime: target.checked });
  }

  private _handleDatetimeFormatChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this._updateConfig({ datetime_format: target.value });
  }

  private _handleContentChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this._updateConfig({ content: target.value });
  }

  private _updateConfig(changes: Partial<HassLayoutCardConfig>): void {
    if (!this._config) return;

    const newConfig = { ...this._config, ...changes };
    this._config = newConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG_NAME]: HassLayoutCardEditor;
  }
}