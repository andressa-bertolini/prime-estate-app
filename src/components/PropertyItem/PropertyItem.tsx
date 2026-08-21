import { NavLink } from "react-router-dom";
import IconLocation from "@/assets/icons/IconLocation";
import IconSqft from "@/assets/icons/IconSqft";
import IconBed from "@/assets/icons/IconBed";
import IconBath from "@/assets/icons/IconBath";
import { Property } from "@/types/properties.types";
import styles from "./PropertyItem.module.css";

const PropertyItem = ({ property, itemsPerRow = 4 }: { property: Property, itemsPerRow?: number; }) => {
    const limit = 4;
    const limitedAmenities = property.amenities.slice(0, limit);

    return (
        <NavLink to={`/property/${property.id}`} className={styles.propertyItem} style={{ "--items-per-row": itemsPerRow } as React.CSSProperties}>
            <img src={property.featuredImage} className={styles.propertyCover} alt={property.title}/>
            <span className={`${styles.propertyBadge} propertyBadge`}>
                {property.purpose === 'rent' ? 'For Rent' : ''}
                {property.purpose === 'sale' ? 'For Sale' : ''}
            </span>
            <h3>{property.title}</h3>
            <p className={`${styles.propertyFeatures} ${styles.iconSmallAligment}`}>
                <span className={styles.highlightedFeature}>
                    <IconLocation width="14px"/>
                    {property.city}
                </span>
                <span className={styles.iconSmallAligment}>
                    <IconSqft width="14px" />
                    {Math.round(property.area * 10.764)}&nbsp;
                    <strong>sqft</strong>&nbsp;
                </span>
                <span className={styles.iconMediumAligment}>
                    <IconBed width="17px"/>
                    {property.bedrooms} <strong>bed{property.bedrooms !== 1 ? 's' : ''}</strong>&nbsp;
                </span>
                <span className={styles.iconSmallAligment}>
                    <IconBath width="15px" />
                    {property.bathrooms} <strong>bath{property.bathrooms !== 1 ? 's' : ''}</strong>
                </span>
            </p>
            <ul className={styles.propertyAmenities}>
                {limitedAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
                {limitedAmenities.length < property.amenities.length && <li>...</li>}
            </ul>
            <div className={styles.propertyFooter}>
                <p className={styles.propertyPrice}>${property.price.toLocaleString('en-US')}</p>
            </div>
        </NavLink>
    );
}

export default PropertyItem;