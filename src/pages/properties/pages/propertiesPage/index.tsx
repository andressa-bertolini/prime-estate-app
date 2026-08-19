import { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IProperty, PropertiesService } from "@/services/properties/PropertiesService";
import { 
  Autocomplete, 
  TextField,
} from '@mui/material';

import SadHouse from "@/assets/images/sad-house.png";
import IconMap from "@/assets/icons/icon-map.svg";
import IconList from "@/assets/icons/icon-list.svg";
import IconFilter from "@/assets/icons/icon-filter.svg";

import PropertyItem from "@/components/PropertyItem";
import Search from "@/components/Search";
import Skeleton from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import PropertiesMapView from "@/components/PropertiesMapView";

const ITEMS_PER_PAGE = 9;

const options = ["Relevance","Highest Price", "Lower Price"];

const Properties = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [filterSticky, setFilterSticky] = useState(false);
    const [orderBy, setOrderBy] = useState<string>("Relevance");
    const [isFiltering, setIsFiltering] = useState(false);

    const queryString = searchParams.get("query")?.toLowerCase() || '';
    const purpose = searchParams.get("purpose") || "rent";
    const type = searchParams.get("type");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const view = searchParams.get("view");

    const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const viewMode: "list" | "map" = view === "map" ? "map" : "list";

    const {
        data: properties,
        isPending
      } = useQuery({
        queryKey: ["properties", purpose, type],
        queryFn: async () => {
          return await PropertiesService.fetchProperties({
            purpose,
            type: type || "",
          });
        },
        staleTime: 1000 * 60 * 30,
    });

    const filteredProperties = useMemo(() => {
        if (!properties) return [];
      
        let filtered = properties;
      
        if (queryString) {
          filtered = filtered.filter((property) => {
            const title = property.title?.toLowerCase() || '';
            const city = property.city?.toLowerCase() || '';
            const state = property.state?.toLowerCase() || '';
            return (
              title.includes(queryString) ||
              city.includes(queryString) ||
              state.includes(queryString)
            );
          });
        }
      
        if (priceMin || priceMax) {
          filtered = filtered.filter((property) => {
            const price = property.price || 0;
            const minPrice = priceMin ? parseFloat(priceMin) : 0;
            const maxPrice = priceMax ? parseFloat(priceMax) : Infinity;
            return price >= minPrice && price <= maxPrice;
          });
        }
      
        if (beds) {
          filtered = filtered.filter((property) => {
            const propertyBeds = property.bedrooms || 0;
            return propertyBeds >= parseInt(beds, 10);
          });
        }
      
        if (baths) {
          filtered = filtered.filter((property) => {
            const propertyBaths = property.bathrooms || 0;
            return propertyBaths >= parseInt(baths, 10);
          });
        }

        if (orderBy === "Highest Price") {
          filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (orderBy === "Lower Price") {
          filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
        }
      
        return filtered;
    }, [properties, queryString, priceMin, priceMax, beds, baths, orderBy]);

    const filtersKey = `${queryString}|${purpose}|${type}|${priceMin}|${priceMax}|${beds}|${baths}|${orderBy}`;    
    const prevFiltersKey = useRef(filtersKey);

    useEffect(() => {
      if (prevFiltersKey.current === filtersKey) return;
      prevFiltersKey.current = filtersKey;

      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params, { replace: true });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 1000);
      return () => clearTimeout(timer);
    }, [filtersKey]);

    const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(page));
      setSearchParams(params);
    };

    const handleViewModeChange = (mode: "list" | "map") => {
      const params = new URLSearchParams(searchParams);
      params.set("view", mode);
      setSearchParams(params);
    };

    const purposeUrl = searchParams.get("purpose") || "rent";

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [purposeUrl]);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [currentPage]);

    useEffect(() => {
      if (!searchParams.get("page")) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        setSearchParams(params, { replace: true });
      }
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setFilterSticky(window.scrollY >= 160);
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="properties-page">
            <div className="properties-page__grid">
              <button
                className={`filters-toggle-btn ${filterSticky && !showFilters ? "is-sticky" : ""} ${showFilters ? "is-open" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <img src={IconFilter} alt="Filter" />
                {showFilters ? "Hide Filters" : "Filters"}
              </button>
              <div className={`search-properties__wrapper ${showFilters ? "is-open" : ""}`}>
                  <div className="search-properties">
                    <Search fullfilters={true} onSearch={() => setShowFilters(false)} />
                  </div>
              </div>
              <div className="list-properties__wrapper">
                <div className="list-properties__nav">
                  <div>
                    <button 
                      className={`view-button ${viewMode === "list" ? "disabled" : ""}`}
                      onClick={() => handleViewModeChange("list")}
                    >
                      <img src={IconList} alt="List View" />
                      List 
                    </button>
                    <button 
                      className={`view-button ${viewMode === "map" ? "disabled" : ""}`}
                      onClick={() => handleViewModeChange("map")}
                    >
                      <img src={IconMap} alt="Map View" />
                      Map
                    </button>
                  </div>
                  
                  {viewMode === "list" && <div className="list-properties__orderby">
                    <span>Order by</span> 
                    <Autocomplete
                      options={options}
                      value={orderBy}
                      disableClearable
                      onChange={(_, newValue) => setOrderBy(newValue)}
                      className="custom-input-alt"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </div>}
                </div>
                  
                {viewMode === "list" && <><div className="properties-page__list">
                  {(isPending || isFiltering) &&
                      [...Array(9)].map((_, i) => <Skeleton key={i} grid={3} />)
                  }
                  {!isPending && !isFiltering ? (
                      filteredProperties && filteredProperties.length > 0 ? (
                          paginatedProperties?.map((property: IProperty) => (
                              <PropertyItem property={property} itemsPerRow={3} key={property.id} />
                          ))
                      ) : (
                          <div className="not-found">
                              <p>No properties found.</p>
                              <img src={SadHouse} alt="Sad House" />
                          </div>
                      )
                  ) : null}
              </div>

              {!isPending && !isFiltering && filteredProperties.length > 0 && totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
              )}
              </>}

              {viewMode === "map" && (
                  <div className="properties-page__map">
                      {(isPending || isFiltering) ? null : filteredProperties.length > 0 ? (
                          <PropertiesMapView properties={filteredProperties} height="600px" />
                      ) : (
                          <div className="not-found">
                              <p>No properties found.</p>
                              <img src={SadHouse} alt="Sad House" />
                          </div>
                      )}
                  </div>
              )}
                  
              </div>
            </div>
        </div>
    );
};

export default Properties;