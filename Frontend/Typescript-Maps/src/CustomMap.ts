export interface Mappable {
    location: {
        lat: number,
        lng: number
    },
    MarkerContent(): string;
}

class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            },
            mapId: 'DEMO_MAP_ID'
        });
    }

    addMarker(mappable: Mappable): void {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng,
            },
        });

        marker.addListener("click", () => {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.MarkerContent()
            });

            infoWindow.open(this.googleMap, marker);
        });
    }
};

export { CustomMap };