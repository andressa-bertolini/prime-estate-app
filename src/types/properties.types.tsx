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