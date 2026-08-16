import { useQuery } from "@tanstack/react-query";
import { IProperty } from "../properties.types"
import { PropertiesService } from "@/services/properties/PropertiesService";
import { NavLink } from "react-router-dom";

/* Components */
import Search from "@/components/Search";
import PropertyItem from "@/components/PropertyItem";
import Skeleton from "@/components/Skeleton";
import FullBackgroundCTA from "@/layouts/FullBackgroundCTA";
import AboutTopics from "@/components/AboutTopics";

/* Images */
import Savings from "@/assets/images/savings.jpg";
import HomeKeys from "@/assets/images/home-keys.jpg";

const Home = () => {
    const usePropertyQuery = (queryKey: string, queryFn: () => Promise<IProperty[]>) => {
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
            <div className="home-search search-container">
                <div className="search">
                    <div className="home-search__wrapper">
                        <Search fullfilters={false}/>
                    </div>
                </div>
            </div>
            <div className="properties-list">
                {isPendingRent && 
                    [...Array(4)].map((_, i) => <Skeleton key={i} grid={4} />)
                }
                {!isPendingRent && Array.isArray(propertiesRent) && propertiesRent.map((property: IProperty) => (
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
            <div className="properties-list">
                {isPendingSale && 
                    [...Array(4)].map((_, i) => <Skeleton key={i} grid={4} />)
                }
                {!isPendingSale && Array.isArray(propertiesSale) && propertiesSale.map((property: IProperty) => (
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

            <div className="home-about">
                <h2>Prime Estate: Your Trusted Partner in Real Estate</h2>
                <p>Helping You Find the Perfect Home with Ease and Confidence</p>
                    <AboutTopics />
                <NavLink to="/about-us">Learn More</NavLink>
            </div>
        </>
    );
};

export default Home;