export type Purpose = "rent" | "sale";

export type SearchParams = {
  query?: string;
  purpose?: Purpose;
  type?: string;
  priceMin?: string | number;
  priceMax?: string | number;
  beds?: string | number;
  baths?: string | number;
  limit?: string | number;
  state?: string;
};

export type Place = {
  state: string;
  cities: string[];
};