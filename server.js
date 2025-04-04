const express = require('express');
const path = require('path');
const fs = require('fs');
const DottedMap = require('dotted-map').default;

const app = express();
const port = process.env.PORT || 8000;

// Serve static files from the root directory
app.use(express.static(__dirname));
app.use(express.json());

// List of EU country codes
const EU_COUNTRIES = [
    'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA',
    'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD',
    'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'
];

// Generate initial map on server start
function generateMap(config = {}) {
    const map = new DottedMap({
        height: 60,
        grid: 'vertical',
        regionBounds: {
            lat: [35, 72],
            lng: [-25, 45]
        }
    });

    // Default settings if not provided
    const settings = {
        regularDotColor: '#4761BF',
        regularDotSize: 0.22,
        euDotColor: '#4761BF',
        euDotSize: 0.32,
        highlightDotColor: '#48b7ff',
        highlightDotSize: 0.32,
        highlightedCountry: 'DEU'
    };

    // Merge provided config with defaults
    Object.assign(settings, config);

    // Generate the SVG
    const svgString = map.getSVG({
        radius: settings.regularDotSize,
        color: settings.regularDotColor,
        backgroundColor: 'none'
    });

    return svgString;
}

// Serve the initial SVG
app.get('/europe_map.svg', (req, res) => {
    const svg = generateMap();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
});

// Handle map updates
app.post('/update-map', (req, res) => {
    const config = req.body;
    const svg = generateMap(config);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 