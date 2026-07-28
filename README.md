# Hass Layout Card

A custom Home Assistant Lovelace card with a flexible layout featuring header, content area, and footer sections.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Header Section**: Display a title, subtitle, and optional date/time
- **Content Area**: Render custom HTML markup
- **Footer Section**: Centered footer text
- **Visual Editor**: Configure the card through the Home Assistant UI
- **Theme Support**: Uses Home Assistant CSS variables for native theme integration

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend" section
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add this repository URL with category "Lovelace"
6. Click "Install" on the Hass Layout Card

### Manual Installation

1. Download `hass-layout-card.js` from the [latest release](../../releases/latest)
2. Copy the file to your `www` folder in Home Assistant (e.g., `/config/www/`)
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/hass-layout-card.js
    type: module
```

## Usage

### Card Configuration

Add the card to your dashboard using the following YAML configuration:

```yaml
type: custom:hass-layout-card
title: My Dashboard
subtitle: Welcome to my smart home
show_datetime: true
datetime_format: default
content: |
  <p>This is the main content area.</p>
  <p>You can add any HTML markup here!</p>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:hass-layout-card` |
| `title` | string | `"Layout Card"` | The main title displayed in the header |
| `subtitle` | string | `""` | Optional subtitle below the title |
| `show_datetime` | boolean | `true` | Show current date and time in header |
| `datetime_format` | string | `"default"` | Date/time format: `default`, `short`, or `iso` |
| `content` | string | `""` | HTML markup for the main content area |

### Date/Time Formats

- **default**: `Monday, January 1, 2024 - 12:00 PM`
- **short**: `Jan 1, 2024 - 12:00 PM`
- **iso**: `2024-01-01 - 12:00:00`

### Visual Editor

The card includes a visual editor that can be accessed through the Home Assistant UI:

1. Enter edit mode on your dashboard
2. Click "Add Card"
3. Search for "Layout Card"
4. Configure the card using the visual editor

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/htpchome/Hass-Layout-Card.git
cd Hass-Layout-Card

# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

### Project Structure

```
Hass-Layout-Card/
├── package.json          # Dependencies and build scripts
├── tsconfig.json         # TypeScript configuration
├── rollup.config.js      # Rollup bundler configuration
├── hacs.json             # HACS repository metadata
├── README.md             # This file
├── dist/                 # Build output
│   └── hass-layout-card.js
└── src/
    ├── hass-layout-card.ts  # Main card component
    ├── editor.ts            # Visual configuration editor
    ├── types.ts             # TypeScript interfaces
    ├── styles.ts            # CSS styles
    ├── constants.ts         # Constants and defaults
    └── router.ts            # Page routing utilities
```

### Building

```bash
# Production build (minified)
npm run build

# Development build with watch mode
npm run watch

# Clean build output
npm run clean
```

## Theming

The card uses Home Assistant CSS variables for theming. You can customize the appearance by overriding these variables:

```yaml
type: custom:hass-layout-card
title: Themed Card
style: |
  ha-card {
    --card-background-color: #1e1e1e;
    --primary-text-color: #ffffff;
    --secondary-text-color: #aaaaaa;
    --divider-color: #333333;
  }
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](../../issues).