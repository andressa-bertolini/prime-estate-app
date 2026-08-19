import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import IconPin from "@/assets/icons/icon-pin.svg";
import { Property } from "@/types/properties.types";
import styles from "./styles.module.css";

type PropertiesMapViewProps = {
    properties: Property[];
}

const baseUrl = import.meta.env.BASE_URL;

const PropertiesMapView = ({ properties }: PropertiesMapViewProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || properties.length === 0) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            center: [-87.6298, 41.8781],
            zoom: 10,
        });

        map.current.getCanvas().style.cursor = "default";

        properties.forEach((property) => {
            if (property.lat && property.long) {
                const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
                    <a href="${baseUrl}property/${property.id}" style="text-decoration: none; color: inherit;">
                        <div style="max-width: 200px;">
                            <div>
                                <img src="${property.featuredImage}" style="width: 200px;"/>
                            </div>
                            <div>
                                <strong style="font-size: 16px;">${property.title}</strong>
                                <p style="margin: 5px 0; font-size: 16px;">
                                    ${property.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </p>
                                <p style="margin: 5px 0; font-size: 12px;">
                                    ${property.bedrooms} bed${property.bedrooms !== 1 ? 's' : ''} • 
                                    ${property.bathrooms} bath${property.bathrooms !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </a>
                `);

                const markerElement = document.createElement("div");
                markerElement.style.width = "40px";
                markerElement.style.height = "40px";
                markerElement.style.display = "flex";
                markerElement.style.alignItems = "center";
                markerElement.style.justifyContent = "center";
                markerElement.style.cursor = "pointer";

                const img = document.createElement("img");
                img.src = IconPin;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "contain";
                markerElement.appendChild(img);

                new maplibregl.Marker({ element: markerElement })
                    .setLngLat([property.long, property.lat])
                    .setPopup(popup)
                    .addTo(map.current!);
            }
        });

        const bounds = new maplibregl.LngLatBounds();
        properties.forEach((property) => {
            if (property.lat && property.long) {
                bounds.extend([property.long, property.lat]);
            }
        });

        if (bounds.getSouthWest() && bounds.getNorthEast()) {
            map.current.fitBounds(bounds, { padding: 50, duration: 0, maxZoom: 16 });
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [properties]);

    return (
        <div
            ref={mapContainer}
            className={styles.propertiesMapView}
        />
    );
};

export default PropertiesMapView;