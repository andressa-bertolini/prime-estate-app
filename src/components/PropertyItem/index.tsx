import "./propertyItem.css";
import { PropertyItemProps } from "./propertyItem.types";

import { NavLink } from "react-router-dom";
import IconLocation from "@/assets/icons/icon-location.svg";
import IconSqft from "@/assets/icons/icon-sqft.svg";
import IconBed from "@/assets/icons/icon-bed.svg";
import IconBath from "@/assets/icons/icon-bath.svg";

const PropertyItem = ({ property }: PropertyItemProps) => {
    const amenities = Array.isArray(property.amenities) ? property.amenities : [];
    const limit = 4;
    const limitedAmenities = amenities.slice(0, limit);

    return (
        <NavLink to={`/property/${property.id}`} className="property-item">
            <img src={property.featuredImage} className="property-cover" alt={property.title}/>
            <span className="property-badge">
                {property.purpose === 'rent' ? 'For Rent' : ''}
                {property.purpose === 'sale' ? 'For Sale' : ''}
            </span>
            <h3>{property.title}</h3>
            <p className="property-features">
                <span className="highlighted-feature">
                    <img src={IconLocation} className="property-icon sqft" alt="Location"/>
                    {property.city}
                </span>
                <span>
                    <img src={IconSqft} className="property-icon sqft" alt="Square feet"/>
                    {property.area && typeof property.area === "number"
                        ? Math.round(property.area * 10.764)
                        : ""} <strong>sqft</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBed} className="property-icon bed" alt="Bed"/>
                    {property.bedrooms} <strong>bed{property.bedrooms !== 1 ? 's' : ''}</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBath} className="property-icon bath" alt="Bath"/>
                    {property.bathrooms} <strong>bath{property.bathrooms !== 1 ? 's' : ''}</strong>
                </span>
            </p>
            <ul className="property-amenities">
                {limitedAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
                {limitedAmenities.length < amenities.length && <li>...</li>}
            </ul>
            <div className="property-footer">
                <p className="property-price">${property.price.toLocaleString('en-US')}</p>
            </div>
        </NavLink>
    );
}

export default PropertyItem;