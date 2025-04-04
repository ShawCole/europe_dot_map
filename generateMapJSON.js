const fs = require('fs');
const { getMapJSON } = require('dotted-map');

// Generate map JSON focused specifically on continental Europe
const mapJsonString = getMapJSON({
    height: 140,  // Increased height for better detail of the focused area
    grid: 'diagonal',
    region: {
        lat: { min: 36, max: 62 },  // Focused on continental Europe's main latitude range
        lng: { min: -10, max: 30 }  // Focused on continental Europe's main longitude range
    },
    countries: [
        // Western Europe
        'FRA', 'DEU', 'BEL', 'NLD', 'LUX', 'CHE',
        // British Isles
        'GBR', 'IRL',
        // Southern Europe
        'ESP', 'PRT', 'ITA', 'GRC', 'MLT',
        // Central Europe
        'AUT', 'CZE', 'POL', 'SVK', 'HUN',
        // Northern Europe
        'DNK', 'NOR', 'SWE', 'FIN',
        // Baltic States
        'EST', 'LVA', 'LTU',
        // Balkans
        'HRV', 'SVN', 'BIH', 'SRB', 'MNE', 'ALB', 'MKD', 'BGR', 'ROU'
    ],
    avoidOuterPins: true  // Prevent pins outside the specified region
});

// Save the JSON to a file
fs.writeFileSync('./src/mapData.js', `// Pre-computed map data for continental Europe
// Generated using dotted-map package with focused European coverage
export default ${mapJsonString};
`);

console.log('Map JSON has been generated and saved to mapData.js'); 