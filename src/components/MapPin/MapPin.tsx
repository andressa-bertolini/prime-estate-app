import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createMapPinElement } from "@/utils/createMapPinElement";
import styles from "./PropertyMap.module.css";

type PropertyMapProps = {
    latitude: number;
    longitude: number;
}

const PropertyMap = ({
    latitude,
    longitude,
}: PropertyMapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            center: [longitude, latitude],
            zoom: 15,
            pitch: 0,
            bearing: 0,
        });

        map.current.getCanvas().style.cursor = "default";
        map.current.boxZoom.disable();
        map.current.dragRotate.disable();
        map.current.doubleClickZoom.disable();
        map.current.scrollZoom.disable();
        map.current.touchZoomRotate.disable();

        new maplibregl.Marker({
            element: createMapPinElement({ cursor: "default" }),
        })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [latitude, longitude]);

    return (
        <div ref={mapContainer} className={styles.propertyMap} />
    );
};

export default PropertyMap;