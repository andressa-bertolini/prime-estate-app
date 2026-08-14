export interface PropertyItemProps {
  property: {
    id: number;
    title: string;
    purpose: "rent" | "sale";
    price: number;
    area?: number;
    bedrooms: number;
    bathrooms: number;
    city: string;
    state: string;
    featuredImage: string;
    images?: string[];
    amenities?: string[];
    agency?: { logo?: { url?: string } };
  };
}
