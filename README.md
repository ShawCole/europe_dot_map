# Interactive European Dot Map

An interactive web application for creating and customizing dot maps of European countries. This tool allows users to highlight specific countries, adjust dot sizes and colors, and export the map in both SVG and PNG formats.

## Features

- Interactive map of Europe with country boundaries
- Customizable dot sizes and colors for:
  - Highlighted country
  - EU member countries
  - Non-EU countries
- Export functionality:
  - Download as SVG (vector format)
  - Download as PNG (raster format)
- Map controls:
  - Center on selected country
  - Center on Europe view
- Real-time updates when changing settings

## Technical Details

The application uses:
- GeoJSON data for accurate country boundaries
- SVG for vector-based map rendering
- HTML5 Canvas for PNG export
- Node.js for the server backend

## Credits and Attribution

This project builds upon several open-source resources:

1. **GeoJSON Data**
   - Source: [Natural Earth Data](https://www.naturalearthdata.com/)
   - License: Public Domain
   - Used for: Country boundaries and geographic data

2. **DottedMap Library**
   - Source: [dotted-map](https://github.com/bleuje/dotted-map)
   - License: MIT
   - Used for: Generating the dot map visualization

3. **Country Codes**
   - Source: [ISO 3166-1 alpha-3](https://www.iso.org/iso-3166-country-codes.html)
   - Used for: Country identification and mapping

## Usage

1. Select a country to highlight from the dropdown menu
2. Adjust dot settings:
   - Regular dots (non-EU countries)
   - EU dots (EU member countries)
   - Highlight dots (selected country)
3. Use map controls to center the view
4. Export the map using the download buttons

## Development

To run the project locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:8000` in your browser

## License

This project is open source and available under the MIT License. See the LICENSE file for details.

## Acknowledgments

Special thanks to:
- The Natural Earth Data team for providing high-quality geographic data
- The creators of the dotted-map library for the visualization framework
- The open-source community for their contributions to the tools and libraries used in this project
# europe_dot_map
