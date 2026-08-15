import axios from "axios";
import { Property, FetchParams } from "../../types/properties.types";

export type IProperty = Property;

const apiBaseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  `${import.meta.env.BASE_URL}api`;

const PropertiesApi = axios.create({
  baseURL: `${apiBaseURL}/`,
});

const toQueryParams = (params: FetchParams = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "limit" || key === "offset") return;
    query.set(key, String(value));
  });

  return query;
};

const fetchProperties = async (params: FetchParams = {}): Promise<Property[]> => {
  const query = toQueryParams(params);

  try {
    const response = await PropertiesApi.get<Property[]>(
      `/properties${query.toString() ? `?${query.toString()}` : ""}`
    );
    let properties = response.data;

    if (!Array.isArray(properties)) {
      console.error("Unexpected response shape from /properties:", properties);
      return [];
    }

    if (params.limit !== undefined) {
      const limitNum = Number(params.limit);
      if (!Number.isNaN(limitNum)) {
        properties = properties.slice(0, limitNum);
      }
    }

    return properties;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchPropertyById = async (id: number): Promise<Property | undefined> => {
  try {
    const response = await PropertiesApi.get<Property>(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const PropertiesService = {
  fetchProperties,
  fetchPropertyById,
};
