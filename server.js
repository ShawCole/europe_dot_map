const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

app.use(express.json());
app.use(express.static('.'));

// List of EU country codes
const EU_COUNTRIES = [
    'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA',
    'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD',
    'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'
];

// Explicitly serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/update-map', (req, res) => {
    try {
        const { highlightedCountry, regularDotColor, regularDotSize, euDotColor, euDotSize, highlightDotColor, highlightDotSize } = req.body;

        // Update the countryConfig in Dot_Map_Generation
        const { countryConfig, generateMap } = require('./Dot_Map_Generation');

        // Update all countries based on their EU membership
        Object.keys(countryConfig).forEach(code => {
            if (code === highlightedCountry) {
                // Highlighted country gets highlight settings
                countryConfig[code] = {
                    color: highlightDotColor,
                    dotSize: highlightDotSize
                };
            } else if (EU_COUNTRIES.includes(code)) {
                // EU countries get EU settings
                countryConfig[code] = {
                    color: euDotColor,
                    dotSize: euDotSize
                };
            } else {
                // Non-EU countries get regular settings
                countryConfig[code] = {
                    color: regularDotColor,
                    dotSize: regularDotSize
                };
            }
        });

        // Regenerate the map
        generateMap();

        // Read and send the new SVG
        const fs = require('fs');
        const svgContent = fs.readFileSync('europe_map.svg', 'utf8');
        res.send(svgContent);
    } catch (error) {
        console.error('Error updating map:', error);
        res.status(500).send('Error updating map: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 