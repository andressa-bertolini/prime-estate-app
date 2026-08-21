import { renderToStaticMarkup } from "react-dom/server";
import IconPin from "@/assets/icons/IconPin";

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
  markerElement.innerHTML = renderToStaticMarkup(
    <IconPin color={color} width={size} height={size} />
  );

  return markerElement;
};
