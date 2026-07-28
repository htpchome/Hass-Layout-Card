/**
 * Styles for Hass Layout Card
 */
import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    overflow: hidden;
    background: var(--card-background-color, #fff);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
  }

  .card-header {
    padding: 16px 16px 8px 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
    margin: 0;
    line-height: 1.4;
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: var(--secondary-text-color, #727272);
    margin: 4px 0 0 0;
    line-height: 1.3;
  }

  .card-datetime {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 8px;
    font-style: italic;
  }

  .card-content {
    flex: 1;
    padding: 16px;
    color: var(--primary-text-color, #212121);
    overflow: auto;
  }

  .card-content p {
    margin: 0 0 8px 0;
  }

  .card-content p:last-child {
    margin-bottom: 0;
  }

  .card-footer {
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    text-align: center;
    font-size: 0.875rem;
    color: var(--secondary-text-color, #727272);
    background: var(--secondary-background-color, #f5f5f5);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-version {
    font-size: 0.75rem;
    opacity: 0.7;
    font-style: italic;
  }

  /* Editor Styles */
  .editor-container {
    padding: 16px;
  }

  .editor-field {
    margin-bottom: 16px;
  }

  .editor-field label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
    margin-bottom: 4px;
  }

  .editor-field input,
  .editor-field textarea,
  .editor-field select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    font-size: 0.875rem;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    box-sizing: border-box;
  }

  .editor-field input:focus,
  .editor-field textarea:focus,
  .editor-field select:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  .editor-field textarea {
    min-height: 120px;
    resize: vertical;
    font-family: monospace;
  }

  .editor-field .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .editor-field input[type="checkbox"] {
    width: auto;
  }

  .editor-help {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 4px;
  }
`;