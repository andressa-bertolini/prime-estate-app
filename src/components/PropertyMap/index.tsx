import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import IconPin from "@/assets/icons/icon-pin.svg";
import styles from "./styles.module.css";

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

        const markerElement = document.createElement("div");
        markerElement.style.width = "40px";
        markerElement.style.height = "40px";
        markerElement.style.display = "flex";
        markerElement.style.alignItems = "center";
        markerElement.style.justifyContent = "center";
        markerElement.style.cursor = "default";

        const img = document.createElement("img");
        img.src = IconPin;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        markerElement.appendChild(img);

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