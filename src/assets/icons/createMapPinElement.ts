import { ICON_PIN_PATH, ICON_PIN_VIEWBOX } from "./IconPin";

type CreateMapPinElementOptions = {
  size?: number;
  color?: string;
  cursor?: string;
};

export const createMapPinElement = ({
  size = 40,
  color = "#1296a9",
  cursor = "pointer",
}: CreateMapPinElementOptions = {}): HTMLDivElement => {
  const markerElement = document.createElement("div");
  markerElement.style.width = `${size}px`;
  markerElement.style.height = `${size}px`;
  markerElement.style.display = "flex";
  markerElement.style.alignItems = "center";
  markerElement.style.justifyContent = "center";
  markerElement.style.cursor = cursor;
  markerElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${ICON_PIN_VIEWBOX}" width="100%" height="100%" fill="${color}">
      <path d="${ICON_PIN_PATH}" />
    </svg>
  `;

  return markerElement;
};
