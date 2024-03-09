function displayMap(locations){
    let map = L.map('map', { 
        // attributionControl: false,
        // zoomControl: false,
        // scrollWheelZoom: false,
        // doubleClickZoom: false,
        zoomSnap: 0.1, // important for perfect fit of the bounds
        // zoomControl: false,
        center: [-118.113491, 34.111745],
        // zoom: 13,
        // dragging: false,
        zoomControl: false,
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        crossOrigin: true
    }).addTo(map);
    
    const points = [];
    locations.forEach(function(loc){
        points.push([loc.coordinates[1], loc.coordinates[0]]);
        L.marker([loc.coordinates[1], loc.coordinates[0]]).addTo(map).bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, { autoClose: false }).openPopup();
    });
    
    const bounds = L.latLngBounds(points).pad(0.5);
    map.fitBounds(bounds);
    map.scrollWheelZoom.disable();    
};

export {displayMap}