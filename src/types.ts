/**
 * TypeScript interfaces for Hass Layout Card
 */

export interface HassLayoutCardConfig {
  type: string;
  title?: string;
  subtitle?: string;
  show_datetime?: boolean;
  datetime_format?: string;
  content?: string;
}

export interface HomeAssistant {
  states: Record<string, EntityState>;
  config: HassConfig;
  language: string;
  themes: HassThemes;
  user: HassUser;
}

export interface EntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HassConfig {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: {
    length: string;
    mass: string;
    temperature: string;
    volume: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  version: string;
}

export interface HassThemes {
  default_theme: string;
  themes: Record<string, Record<string, string>>;
}

export interface HassUser {
  id: string;
  is_admin: boolean;
  is_owner: boolean;
  name: string;
}

export interface ConfigChangedEvent {
  config: HassLayoutCardConfig;
}