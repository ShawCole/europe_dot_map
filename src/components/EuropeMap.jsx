import React, { useState } from 'react';
import DottedMap from 'dotted-map/without-countries';
import mapData from '../mapData';

const cities = [
    // Western Europe
    { name: 'Paris', lat: 48.8566, lng: 2.3522, color: '#4ECDC4' },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050, color: '#45B7D1' },
    { name: 'Brussels', lat: 50.8503, lng: 4.3517, color: '#FF6B6B' },
    { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, color: '#D4A5A5' },
    { name: 'Luxembourg', lat: 49.6116, lng: 6.1319, color: '#FFB6C1' },
    { name: 'Bern', lat: 46.9480, lng: 7.4474, color: '#CD5C5C' },
    // British Isles
    { name: 'London', lat: 51.5074, lng: -0.1278, color: '#FF69B4' },
    { name: 'Dublin', lat: 53.3498, lng: -6.2603, color: '#98FB98' },
    // Southern Europe
    { name: 'Madrid', lat: 40.4168, lng: -3.7038, color: '#96CEB4' },
    { name: 'Lisbon', lat: 38.7223, lng: -9.1393, color: '#D35400' },
    { name: 'Rome', lat: 41.9028, lng: 12.4964, color: '#FFEEAD' },
    { name: 'Athens', lat: 37.9838, lng: 23.7275, color: '#1ABC9C' },
    // Central Europe
    { name: 'Vienna', lat: 48.2082, lng: 16.3738, color: '#9B59B6' },
    { name: 'Prague', lat: 50.0755, lng: 14.4378, color: '#3498DB' },
    { name: 'Warsaw', lat: 52.2297, lng: 21.0122, color: '#E74C3C' },
    { name: 'Budapest', lat: 47.4979, lng: 19.0402, color: '#2ECC71' },
    // Northern Europe
    { name: 'Copenhagen', lat: 55.6761, lng: 12.5683, color: '#F1C40F' },
    { name: 'Stockholm', lat: 59.3293, lng: 18.0686, color: '#FF9FF3' },
    { name: 'Oslo', lat: 59.9139, lng: 10.7522, color: '#00CED1' },
    { name: 'Helsinki', lat: 60.1699, lng: 24.9384, color: '#87CEEB' },
    // Baltic States
    { name: 'Tallinn', lat: 59.4370, lng: 24.7536, color: '#E67E22' },
    { name: 'Riga', lat: 56.9496, lng: 24.1052, color: '#FF7F50' },
    { name: 'Vilnius', lat: 54.6872, lng: 25.2797, color: '#DDA0DD' },
    // Balkans
    { name: 'Zagreb', lat: 45.8150, lng: 15.9819, color: '#27AE60' },
    { name: 'Belgrade', lat: 44.7866, lng: 20.4489, color: '#C0392B' },
    { name: 'Bucharest', lat: 44.4268, lng: 26.1025, color: '#F39C12' },
    { name: 'Sofia', lat: 42.6977, lng: 23.3219, color: '#8E44AD' }
];

const EuropeMap = () => {
    const [hoveredCity, setHoveredCity] = useState(null);

    // Create a new map instance using the pre-computed data
    const map = new DottedMap({ map: JSON.parse(mapData) });

    // Get raw points for city markers to enable interactivity
    const cityPoints = [];

    // Add pins for each city and store their coordinates
    cities.forEach(city => {
        const pin = map.addPin({
            lat: city.lat,
            lng: city.lng,
            svgOptions: {
                color: city.color,
                radius: 0.35
            },
            data: { name: city.name }
        });

        if (pin) {
            cityPoints.push({
                ...pin,
                name: city.name,
                color: city.color
            });
        }
    });

    // Generate the SVG with hexagon shape for better visual appeal
    const svgMap = map.getSVG({
        radius: 0.18,  // Slightly reduced for better density
        color: '#423B38',
        shape: 'hexagon',
        backgroundColor: '#020300',
    });

    return (
        <div className="europe-map" style={{ position: 'relative' }}>
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                alt="Dotted map of Europe"
                style={{
                    width: '100%',
                    maxWidth: '1200px',  // Increased for better detail
                    filter: 'drop-shadow(0 0 10px rgba(66, 59, 56, 0.3))'
                }}
            />

            {/* City markers with hover effect */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
                viewBox="0 0 100 100"
            >
                {cityPoints.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={hoveredCity === point.name ? "0.5" : "0.35"}
                        fill={point.color}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            filter: hoveredCity === point.name ? 'brightness(1.2)' : 'none'
                        }}
                        onMouseEnter={() => setHoveredCity(point.name)}
                        onMouseLeave={() => setHoveredCity(null)}
                    />
                ))}
            </svg>

            {/* Tooltip */}
            {hoveredCity && (
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(2, 3, 0, 0.9)',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '14px',
                        pointerEvents: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    {hoveredCity}
                </div>
            )}
        </div>
    );
};

export default EuropeMap; 