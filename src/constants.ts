/**
 * Constants for Hass Layout Card
 */

export const CARD_VERSION = '1.0.4';
export const CARD_TAG_NAME = 'hass-layout-card';
export const EDITOR_TAG_NAME = 'hass-layout-card-editor';

export const DEFAULT_CONFIG = {
  type: `custom:${CARD_TAG_NAME}`,
  title: 'Layout Card',
  subtitle: '',
  show_datetime: true,
  datetime_format: 'default',
  content: '<p>Welcome to your custom layout card!</p>',
};

export const DATETIME_FORMATS = {
  default: {
    date: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions,
    time: { hour: '2-digit', minute: '2-digit' } as Intl.DateTimeFormatOptions,
  },
  short: {
    date: { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions,
    time: { hour: '2-digit', minute: '2-digit' } as Intl.DateTimeFormatOptions,
  },
  iso: {
    date: { year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions,
    time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } as Intl.DateTimeFormatOptions,
  },
};