import { useSearch } from "@context/SearchContext";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
    Autocomplete, 
    TextField,
    Slider,
    InputAdornment
} from '@mui/material';
import { SearchService } from "@services/search/SearchService";
import ChoiceChips from "../ChoiceChips";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { searchDefaultValues } from "@context/SearchContext";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type SearchProps = {
    fullfilters: boolean;
    onSearch?: () => void;
};

const Search = ({ fullfilters, onSearch }: SearchProps) => {
    const [urlSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { searchParams: {
        query, purpose, type, price, beds, baths
    }, setSearchParams } = useSearch();

    const [places, setPlaces] = useState<{ name: string; type: string }[]>([]);
    const [openFilter, setOpenFilter] = useState(false);
    
    const options = ["Apartment", "House"].map(opt => opt.toLowerCase());
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const getPriceRange = (currentPurpose: string) => {
        return currentPurpose === "sale" 
            ? { min: 50000, max: 1000000 }
            : { min: 500, max: 5000 };
    };

    const { min: minPrice, max: maxPrice } = getPriceRange(purpose);

    const setQuery = (newQuery: string) => {
        setSearchParams(prev => ({
            ...prev,
            query: newQuery
        }));
    };

    const setPurpose = (newPurpose: string) => {
        const newRange = getPriceRange(newPurpose);
        setSearchParams(prev => ({
            ...prev,
            purpose: newPurpose,
            price: [newRange.min, newRange.max]
        }));
    };

    const setType = (newType: string) => {
        setSearchParams(prev => ({
            ...prev,
            type: newType
        }));
    };

    const setPrice = (newPrice: [number, number]) => {
        setSearchParams(prev => ({
            ...prev,
            price: newPrice
        }));
    };

    const setBeds = (newBeds: number) => {
        setSearchParams(prev => ({
            ...prev,
            beds: newBeds
        }));
    };

    const setBaths = (newBaths: number) => {
        setSearchParams(prev => ({
            ...prev,
            baths: newBaths
        }));
    };

    const handlePurposeValue = (data: string) => {
        setPurpose(data);
    };

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        setPrice(newValue as [number, number]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (purpose) params.append('purpose', purpose);
        if (type) params.append('type', type);
        if (price[0] !== minPrice) params.append('priceMin', String(price[0]));
        if (price[1] !== maxPrice) params.append('priceMax', String(price[1]));
        if (beds) params.append('beds', String(beds));
        if (baths) params.append('baths', String(baths));

        const currentView = urlSearchParams.get('view');
        if (currentView) params.append('view', currentView);

        e.preventDefault();
        setOpenFilter(false);
        onSearch?.();
        navigate(`/properties?${params.toString()}`);
    };

    const handleChipClick = (type: 'beds' | 'baths', value: number, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
                
        if (type === 'beds') {
            const newValue = beds === value ? 0 : value;
            setBeds(newValue);
        } else {
            const newValue = baths === value ? 0 : value;
            setBaths(newValue);
        }
    };

    useEffect(() => {
        let isCalled = false;

        const loadPlaces = async () => {
            if (isCalled) return;
            isCalled = true;

            const placesData = await SearchService.fetchPlaces();
            const states = placesData?.map((place) => ({
                name: place.state,
                type: "state"
            })) ?? [];

            const cities = placesData?.flatMap(place =>
                place.cities ? place.cities.map(city => ({ name: city, type: "city" })) : []
            ) ?? [];

            setPlaces([...states, ...cities]);
        };

        loadPlaces();
    }, []);

    useEffect(() => {
        const hasQueryParams = Array.from(urlSearchParams.keys()).length > 0;
        
        if (hasQueryParams) {
            const queryParam = urlSearchParams.get("query") || '';
            const purposeParam = urlSearchParams.get("purpose") || searchDefaultValues.purpose;
            const typeParam = urlSearchParams.get("type") || searchDefaultValues.type;
            
            const isPurposeSale = purposeParam === 'sale';
            const defaultMinPrice = isPurposeSale ? 50000 : 500;
            const defaultMaxPrice = isPurposeSale ? 1000000 : 5000;
            
            const priceMin = Number(urlSearchParams.get("priceMin")) || defaultMinPrice;
            const priceMax = Number(urlSearchParams.get("priceMax")) || defaultMaxPrice;
            const bedsParam = Number(urlSearchParams.get("beds")) || 0;
            const bathsParam = Number(urlSearchParams.get("baths")) || 0;
            
            setSearchParams({
                query: queryParam,
                purpose: purposeParam,
                type: typeParam,
                price: [priceMin, priceMax],
                beds: bedsParam,
                baths: bathsParam,
                sqft: searchDefaultValues.sqft,
            });
        } else {
            const defaultPurpose = searchDefaultValues.purpose;
            const defaultRange = getPriceRange(defaultPurpose);
            
            setSearchParams({
                query: '',
                purpose: defaultPurpose,
                type: searchDefaultValues.type,
                price: [defaultRange.min, defaultRange.max],
                beds: 0,
                baths: 0,
                sqft: searchDefaultValues.sqft,
            });
        }
    }, [urlSearchParams.toString()]);

    const safePrice = price && Array.isArray(price) && price.length === 2 
        ? price 
        : [minPrice, maxPrice];

    const safeBeds = typeof beds === 'number' ? beds : Number(beds) || 0;
    const safeBaths = typeof baths === 'number' ? baths : Number(baths) || 0;

    return (
        <form onSubmit={handleSubmit}>
            <div className="search-options">
                <div className={(openFilter ? "open" : "") + " search-fields"}>
                    <div>
                        <label>
                            <span>Where do you want to live?</span>
                            <Autocomplete
                                freeSolo
                                value={places.find(p => p.name === query) || { name: query, type: '' }}
                                options={places}
                                getOptionLabel={(option) =>
                                    typeof option === "string" ? option : option.name || ""
                                }
                                groupBy={(option) =>
                                    typeof option === "string" ? "" : option.type
                                }
                                className="custom-input"
                                onInputChange={(_event, newInputValue) => {
                                    setQuery(newInputValue);
                                }}
                                renderGroup={(params) => (
                                    <li key={params.key}>
                                      <div
                                        style={{
                                          position: 'sticky',
                                          top: -8,
                                          zIndex: 1,
                                          backgroundColor: '#fff',
                                          textTransform: 'uppercase',
                                          fontWeight: 'bold',
                                          padding: '8px 12px',
                                          borderBottom: '1px solid #eee',
                                          margin: 0,
                                        }}
                                      >
                                        {params.group}
                                      </div>
                                      <ul style={{ paddingLeft: 0, margin: 0 }}>{params.children}</ul>
                                    </li>
                                )}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        placeholder="State or city"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                }
                            />
                        </label>
                        <label>
                            <span>Property Type</span>
                            <Autocomplete
                                options={options}
                                value={type}
                                disableClearable
                                className="custom-input"
                                onChange={(_event, newValue) => {
                                    setType(newValue);
                                }}
                                getOptionLabel={(option) => capitalize(option)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            readOnly: true,
                                            value: capitalize(type),
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Transaction Type</span>
                            <ChoiceChips value={purpose} onChange={handlePurposeValue} />
                        </label>
                        <label>
                            <span>Price limit</span>
                            <div className="search-options__range">
                                <Slider
                                    className="custom-slider"
                                    value={safePrice}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="off"
                                    min={minPrice}
                                    max={maxPrice}
                                    step={100}
                                    sx={{
                                        '& .MuiSlider-track': {
                                          border: 'none',
                                          boxShadow: 'none',
                                        },
                                        '& .MuiSlider-thumb': {
                                          boxShadow: 'none',
                                        }
                                    }}
                                />
                                <p>
                                    from&nbsp;
                                    <strong>${safePrice[0] ? safePrice[0].toLocaleString('en-US') : minPrice.toLocaleString('en-US')}</strong>&nbsp;
                                    to&nbsp;
                                    <strong>${safePrice[1] ? safePrice[1].toLocaleString('en-US') : maxPrice.toLocaleString('en-US')}</strong>
                                </p>
                            </div>
                        </label>
                    </div>
                    {fullfilters ? (
                        <div className="extra-filters">
                            <label>
                                <span>Bedrooms</span>
                                <Stack direction="row" spacing={1}>
                                    {[1, 2, 3, 4].map((num) => (
                                        <Chip 
                                            key={num}
                                            label={num === 4 ? "4+" : num.toString()}
                                            clickable
                                            color={safeBeds === num ? "primary" : "default"}
                                            variant={safeBeds === num ? "filled" : "outlined"}
                                            onClick={(e: React.MouseEvent) => handleChipClick('beds', num, e)}
                                            sx={{
                                                backgroundColor: safeBeds === num ? '#1296a9' : 'white',
                                                color: safeBeds === num ? 'white' : 'black',
                                                '&:hover': {
                                                  backgroundColor: safeBeds === num
                                                    ? '#1296a9'
                                                    : '#dedede',
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </label>
                            <label>
                                <span>Bathrooms</span>
                                <Stack direction="row" spacing={1}>
                                    {[1, 2, 3, 4].map((num) => (
                                        <Chip 
                                            key={num}
                                            label={num === 4 ? "4+" : num.toString()}
                                            clickable
                                            variant={safeBaths === num ? "filled" : "outlined"}
                                            onClick={(e: React.MouseEvent) => handleChipClick('baths', num, e)}
                                            sx={{
                                                backgroundColor: safeBaths === num ? '#1296a9' : 'white',
                                                color: safeBaths === num ? 'white' : 'black',
                                                '&:hover': {
                                                  backgroundColor: safeBaths === num
                                                    ? '#1296a9'
                                                    : '#dedede',
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </label>
                        </div>
                    ):""}
                </div>
            </div>
            <button type="submit" className="search-bar__submit">Search</button>
        </form>
    );
};

export default Search;