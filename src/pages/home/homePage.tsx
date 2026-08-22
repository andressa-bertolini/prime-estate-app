import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/properties.types"
import { PropertiesService } from "@/services/properties/PropertiesService";
import { NavLink } from "react-router-dom";
import Search from "@/components/Search/Search";
import PropertyItem from "@/components/PropertyItem/PropertyItem";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import FullBackgroundCTA from "@/sections/FullBackgroundCTA/FullBackgroundCTA";
import AboutTopics from "@/sections/AboutTopics/AboutTopics";
import Savings from "@/assets/images/savings.jpg";
import HomeKeys from "@/assets/images/home-keys.jpg";
import styles from './home.module.css';

const Home = () => {
    const usePropertyQuery = (queryKey: string, queryFn: () => Promise<Property[]>) => {
        return useQuery({
            queryKey: [queryKey],
            staleTime: 1000 * 60 * 30,
            queryFn,
        });
    };

    const { data: propertiesRent, isLoading: isPendingRent } = 
        usePropertyQuery("propertiesRent", () => PropertiesService.fetchProperties({ purpose: "rent", limit: "4" }));

    const { data: propertiesSale, isLoading: isPendingSale } = 
        usePropertyQuery("propertiesSale", () => PropertiesService.fetchProperties({ purpose: "sale", limit: "4" }));

    return(
        <>  
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <div className={styles.searchWrapper}>
                        <Search variant="inline" />
                    </div>
                </div>
            </div>
            <div className={styles.propertiesList}>
                {isPendingRent && 
                    [...Array(4)].map((_, i) => <LoadingSkeleton key={i} itemsPerRow={4} />)
                }
                {!isPendingRent && Array.isArray(propertiesRent) && propertiesRent.map((property: Property) => (
                    <PropertyItem property={property} key={property.id} />
                ))}
            </div>
            <FullBackgroundCTA
                image={Savings}
                imageAlignment="center center"
                text="Smart Home Buying Starts Here: Calculate Your Down Payment"
                buttonText="Calculate"
                link="calculator"
            />
            <div className={styles.propertiesList}>
                {isPendingSale && 
                    [...Array(4)].map((_, i) => <LoadingSkeleton key={i} itemsPerRow={4} />)
                }
                {!isPendingSale && Array.isArray(propertiesSale) && propertiesSale.map((property: Property) => (
                    <PropertyItem property={property} key={property.id} />
                ))}
            </div>
            <FullBackgroundCTA
                image={HomeKeys}
                imageAlignment="center bottom"
                text="Your Perfect Home Awaits: Meet the Realtors Who Can Help"
                buttonText="Learn More"
                link="realtors"
            />

            <div className={styles.about}>
                <h2>Prime Estate: Your Trusted Partner in Real Estate</h2>
                <p>Helping You Find the Perfect Home with Ease and Confidence</p>
                    <AboutTopics />
                <NavLink to="/about-us">Learn More</NavLink>
            </div>
        </>
    );
};

export default Home;