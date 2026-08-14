import axios from "axios";
import { Place, FetchParams } from "../../types/search.types";

const apiBaseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  `${import.meta.env.BASE_URL}api`;

const SearchAPI = axios.create({
  baseURL: `${apiBaseURL}/`,
});

const fetchPlaces = async (params: FetchParams = {}): Promise<Place[]> => {
  const query = new URLSearchParams();

  if (params.limit !== undefined) {
    query.set("limit", String(params.limit));
  }

  if (params.state) {
    query.set("state", params.state);
  }

  try {
    const response = await SearchAPI.get(
      `/places${query.toString() ? `?${query.toString()}` : ""}`
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const SearchService = {
  fetchPlaces,
};
