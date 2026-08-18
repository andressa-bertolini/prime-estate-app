import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PropertiesService } from "@/services/properties/PropertiesService";
import PropertyItem from "@/components/PropertyItem";
import { Property } from "@/types/properties.types";
import styles from "./styles.module.css";

const RelatedProperties = () => {
    const { id } = useParams<{ id: string }>();
    const currentPropertyId = Number(id);

    const { data: currentProperty } = useQuery({
        queryKey: ["property", id],
        queryFn: () => PropertiesService.fetchPropertyById(currentPropertyId),
        enabled: !!id,
    });

    const { data: allProperties = [], isPending } = useQuery({
        queryKey: ["properties", currentProperty?.purpose],
        queryFn: async () => {
            return await PropertiesService.fetchProperties({
                purpose: currentProperty?.purpose || "rent",
                type: "",
            });
        },
        enabled: !!currentProperty,
        staleTime: 1000 * 60 * 30,
    });

    const relatedProperties = useMemo(() => {
        if (!currentProperty || !allProperties.length) return [];

        const otherProperties = allProperties.filter(
            (prop: Property) => prop.id !== currentPropertyId
        );

        const sorted = otherProperties.sort((a: Property, b: Property) => {
            let scoreA = 0;
            let scoreB = 0;

            if (a.city === currentProperty.city) scoreA += 50;
            if (b.city === currentProperty.city) scoreB += 50;

            if (a.type === currentProperty.type) scoreA += 30;
            if (b.type === currentProperty.type) scoreB += 30;

            if (a.purpose === currentProperty.purpose) scoreA += 20;
            if (b.purpose === currentProperty.purpose) scoreB += 20;

            if (a.bedrooms === currentProperty.bedrooms) scoreA += 10;
            if (b.bedrooms === currentProperty.bedrooms) scoreB += 10;

            return scoreB - scoreA;
        });

        return sorted.slice(0, 3);
    }, [currentPropertyId, currentProperty, allProperties]);

    if (isPending || !currentProperty) {
        return null;
    }

    if (relatedProperties.length === 0) {
        return null;
    }

    return (
        <section className="related-properties">
            <h3>Related Properties</h3>
            <div className="properties-page__list">
                {relatedProperties.map((property: Property) => (
                    <PropertyItem key={property.id} property={property} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProperties;