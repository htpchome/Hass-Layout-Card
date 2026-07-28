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
  private _resizeObserver?: ResizeObserver;
  private _mutationObserver?: MutationObserver;
  private _scrollHandler?: () => void;
  private _visibilityHandler?: () => void;
  private _touchStartHandler?: (e: TouchEvent) => void;
  private _touchEndHandler?: (e: TouchEvent) => void;
  private _lastKnownScrollY = 0;
  private _lastHeaderTop = 0;
  private _headerCheckInterval?: ReturnType<typeof setInterval>;
  private _isPulling = false;
  private _pullStartY = 0;

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
    this._setupLayoutObservers();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopDateTimeUpdate();
    this._teardownLayoutObservers();
  }

  /**
   * Sets up observers to handle layout changes from iOS pull-to-refresh
   * and other viewport shifts that can cause card positioning issues
   */
  private _setupLayoutObservers(): void {
    // ResizeObserver to detect container size changes
    this._resizeObserver = new ResizeObserver(() => {
      this._handleLayoutShift();
    });
    
    // Observe the parent container (the Lovelace view container)
    const parentContainer = this._getLovelaceContainer();
    if (parentContainer) {
      this._resizeObserver.observe(parentContainer);
    }
    // Also observe self for size changes
    this._resizeObserver.observe(this);

    // Set up MutationObserver to watch the HA header for position changes
    this._setupHeaderObserver();

    // Scroll handler to detect pull-to-refresh behavior
    this._scrollHandler = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Detect potential pull-to-refresh: scroll goes negative or sudden jump
      if (currentScrollY < 0 || (this._lastKnownScrollY > 50 && currentScrollY < 10)) {
        this._startHeaderPolling();
      }
      
      this._lastKnownScrollY = currentScrollY;
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });

    // Touch handlers to detect pull-to-refresh gesture
    this._touchStartHandler = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        this._pullStartY = e.touches[0].clientY;
        this._isPulling = true;
      }
    };
    
    this._touchEndHandler = (e: TouchEvent) => {
      if (this._isPulling) {
        const pullDistance = e.changedTouches[0].clientY - this._pullStartY;
        // If pulled down more than 60px, likely a refresh gesture
        if (pullDistance > 60 && window.scrollY <= 0) {
          this._startHeaderPolling();
        }
        this._isPulling = false;
      }
    };
    
    window.addEventListener('touchstart', this._touchStartHandler, { passive: true });
    window.addEventListener('touchend', this._touchEndHandler, { passive: true });

    // Visibility change handler - recalculate when returning to view
    this._visibilityHandler = () => {
      if (!document.hidden) {
        requestAnimationFrame(() => {
          this._handleLayoutShift();
        });
      }
    };
    document.addEventListener('visibilitychange', this._visibilityHandler);

    // Store initial positions
    this._lastKnownScrollY = window.scrollY || document.documentElement.scrollTop;
    this._lastHeaderTop = this._getHeaderTop();
  }

  /**
   * Sets up MutationObserver to watch the HA header element for changes
   */
  private _setupHeaderObserver(): void {
    const header = this._getHAHeader();
    if (!header) {
      // Retry after a short delay if header not found yet
      setTimeout(() => this._setupHeaderObserver(), 500);
      return;
    }

    this._mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const currentHeaderTop = this._getHeaderTop();
          // If header position changed significantly, handle the shift
          if (Math.abs(currentHeaderTop - this._lastHeaderTop) > 5) {
            this._lastHeaderTop = currentHeaderTop;
            this._handleLayoutShift();
          }
        }
      }
    });

    // Watch for style and class changes on the header
    this._mutationObserver.observe(header, {
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
    });

    // Also watch the header's parent for transform changes
    const headerParent = header.parentElement;
    if (headerParent) {
      this._mutationObserver.observe(headerParent, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    this._lastHeaderTop = this._getHeaderTop();
  }

  /**
   * Gets the Home Assistant header element
   */
  private _getHAHeader(): HTMLElement | null {
    // Try various selectors for the HA header
    const selectors = [
      'app-header',
      'ha-app-layout app-header',
      '.header',
      'app-toolbar',
      'ha-menu-button',
    ];
    
    // Search in the shadow DOM host or document
    const root = this.getRootNode() as Document | ShadowRoot;
    
    for (const selector of selectors) {
      const element = root.querySelector(selector) || document.querySelector(selector);
      if (element) {
        return element as HTMLElement;
      }
    }
    
    // Try to find via home-assistant element
    const haMain = document.querySelector('home-assistant')?.shadowRoot?.querySelector('ha-panel-lovelace');
    if (haMain) {
      const header = haMain.shadowRoot?.querySelector('app-header') || 
                     haMain.shadowRoot?.querySelector('hui-view')?.shadowRoot?.querySelector('app-header');
      if (header) {
        return header as HTMLElement;
      }
    }
    
    return null;
  }

  /**
   * Gets the current top position of the HA header
   */
  private _getHeaderTop(): number {
    const header = this._getHAHeader();
    if (header) {
      const rect = header.getBoundingClientRect();
      return rect.top;
    }
    return 0;
  }

  /**
   * Starts polling to detect when header returns to normal position after refresh
   */
  private _startHeaderPolling(): void {
    if (this._headerCheckInterval) {
      return; // Already polling
    }

    let pollCount = 0;
    const maxPolls = 50; // Poll for ~2.5 seconds max

    this._headerCheckInterval = setInterval(() => {
      pollCount++;
      const currentHeaderTop = this._getHeaderTop();
      
      // Check if header has moved back up (refresh completed)
      if (Math.abs(currentHeaderTop - this._lastHeaderTop) > 5) {
        this._lastHeaderTop = currentHeaderTop;
        this._handleLayoutShift();
      }

      // Stop polling after max polls or if we've been stable for a while
      if (pollCount >= maxPolls) {
        this._stopHeaderPolling();
      }
    }, 50);

    // Auto-stop after 3 seconds
    setTimeout(() => this._stopHeaderPolling(), 3000);
  }

  /**
   * Stops header position polling
   */
  private _stopHeaderPolling(): void {
    if (this._headerCheckInterval) {
      clearInterval(this._headerCheckInterval);
      this._headerCheckInterval = undefined;
    }
  }

  /**
   * Tears down all observers and event listeners
   */
  private _teardownLayoutObservers(): void {
    this._stopHeaderPolling();

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = undefined;
    }

    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = undefined;
    }

    if (this._touchStartHandler) {
      window.removeEventListener('touchstart', this._touchStartHandler);
      this._touchStartHandler = undefined;
    }

    if (this._touchEndHandler) {
      window.removeEventListener('touchend', this._touchEndHandler);
      this._touchEndHandler = undefined;
    }

    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = undefined;
    }
  }

  /**
   * Gets the Lovelace view container element
   */
  private _getLovelaceContainer(): HTMLElement | null {
    // Walk up the DOM to find the Lovelace container
    let element: HTMLElement | null = this.parentElement;
    while (element) {
      // Look for common HA container selectors
      if (
        element.classList.contains('column') ||
        element.id === 'columns' ||
        element.tagName.toLowerCase() === 'hui-view' ||
        element.tagName.toLowerCase() === 'hui-panel-view'
      ) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }

  /**
   * Handles layout shifts by forcing a re-render and position recalculation
   * This is the key fix for iOS pull-to-refresh positioning issues
   */
  private _handleLayoutShift(): void {
    // Force the browser to recalculate layout
    void this.offsetHeight;
    
    // Request a re-render of the component
    this.requestUpdate();
    
    // Use multiple animation frames to ensure layout is fully recalculated
    requestAnimationFrame(() => {
      // Force reflow by reading layout properties
      void this.getBoundingClientRect();
      
      requestAnimationFrame(() => {
        // Force another layout calculation
        void this.offsetHeight;
        void this.getBoundingClientRect();
        
        // Try to scroll to ensure proper positioning
        const cardRect = this.getBoundingClientRect();
        const headerTop = this._getHeaderTop();
        
        // If card appears to be overlapping with header area, force adjustment
        if (cardRect.top < headerTop + 50 && headerTop > 0) {
          // Dispatch scroll event to trigger HA's layout recalculation
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        }
        
        // Dispatch a custom event that other cards can listen to
        this.dispatchEvent(new CustomEvent('layout-shift-handled', {
          bubbles: true,
          composed: true,
          detail: { headerTop, cardTop: cardRect.top }
        }));
      });
    });
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