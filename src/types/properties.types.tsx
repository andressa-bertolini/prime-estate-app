export interface Property {
  id: number;
  title: string;
  description: string;
  purpose: "rent" | "sale";
  type: "apartment" | "house";
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  state: string;
  lat: number;
  long: number;
  featuredImage: string;
  images: string[];
  amenities: string[];
}

export type FetchParams = {
  query?: string;
  purpose?: "rent" | "sale" | string;
  type?: string;
  priceMin?: string | number;
  priceMax?: string | number;
  beds?: string | number;
  baths?: string | number;
  limit?: string | number;
  offset?: string | number;
};
