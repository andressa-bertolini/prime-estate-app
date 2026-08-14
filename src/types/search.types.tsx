export type FetchParams = {
  limit?: string | number;
  state?: string;
};

export type Place = {
  state: string;
  cities: string[];
};
