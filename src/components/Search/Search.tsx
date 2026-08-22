import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
    Autocomplete, 
    TextField,
    Slider,
    InputAdornment,
    Stack,
    Chip
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { SearchService } from "@/services/search/SearchService";
import ChoiceChips from "./ChoiceChips";
import { Purpose, SearchParams } from "@/types/search.types";
import styles from './Search.module.css';

type SearchProps = {
    variant: "inline" | "sidebar";
    onSearch?: () => void;
};

const searchDefaultValues = {
    query: '',
    purpose: 'rent' as Purpose,
    type: 'apartment',
    beds: 0,
    baths: 0,
} as const;

const parsePurpose = (value: string | null | undefined): Purpose =>
    value === 'sale' || value === 'rent' ? value : searchDefaultValues.purpose;

const getPriceRange = (purpose: Purpose) => {
    return purpose === 'sale'
        ? { min: 50000, max: 1000000 }
        : { min: 500, max: 5000 };
};

const getDefaultFormState = (): SearchParams => {
    const { min, max } = getPriceRange(searchDefaultValues.purpose);

    return {
        query: searchDefaultValues.query,
        purpose: searchDefaultValues.purpose,
        type: searchDefaultValues.type,
        priceMin: min,
        priceMax: max,
        beds: searchDefaultValues.beds,
        baths: searchDefaultValues.baths,
    };
};

const parseFormStateFromUrl = (urlSearchParams: URLSearchParams): SearchParams => {
    const hasQueryParams = Array.from(urlSearchParams.keys()).length > 0;

    if (!hasQueryParams) {
        return getDefaultFormState();
    }

    const purposeParam = parsePurpose(urlSearchParams.get('purpose'));
    const { min: defaultMinPrice, max: defaultMaxPrice } = getPriceRange(purposeParam);

    return {
        query: urlSearchParams.get('query') || '',
        purpose: purposeParam,
        type: urlSearchParams.get('type') || searchDefaultValues.type,
        priceMin: Number(urlSearchParams.get('priceMin')) || defaultMinPrice,
        priceMax: Number(urlSearchParams.get('priceMax')) || defaultMaxPrice,
        beds: Number(urlSearchParams.get('beds')) || 0,
        baths: Number(urlSearchParams.get('baths')) || 0,
    };
};


const Search = ({ variant, onSearch }: SearchProps) => {
    const [urlSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formState, setFormState] = useState(getDefaultFormState);
    const { query, purpose = searchDefaultValues.purpose, type = searchDefaultValues.type, priceMin, priceMax, beds, baths } = formState;

    const [places, setPlaces] = useState<{ name: string; type: string }[]>([]);
    const [openFilter, setOpenFilter] = useState(false);
    
    const options = ["apartment", "house"];
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const { min: minPrice, max: maxPrice } = getPriceRange(purpose);

    const setQuery = (newQuery: string) => {
        setFormState(prev => ({ ...prev, query: newQuery }));
    };

    const setPurpose = (newPurpose: Purpose) => {
        const newRange = getPriceRange(newPurpose);
        setFormState(prev => ({
            ...prev,
            purpose: newPurpose,
            priceMin: newRange.min,
            priceMax: newRange.max,
        }));
    };

    const setType = (newType: string) => {
        setFormState(prev => ({ ...prev, type: newType }));
    };

    const setPrice = (newPriceMin: number, newPriceMax: number) => {
        setFormState(prev => ({ ...prev, priceMin: newPriceMin, priceMax: newPriceMax }));
    };

    const setBeds = (newBeds: number) => {
        setFormState(prev => ({ ...prev, beds: newBeds }));
    };

    const setBaths = (newBaths: number) => {
        setFormState(prev => ({ ...prev, baths: newBaths }));
    };

    const handlePurposeValue = (data: string) => {
        setPurpose(parsePurpose(data));
    };

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        const [newPriceMin, newPriceMax] = newValue as [number, number];
        setPrice(newPriceMin, newPriceMax);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (purpose) params.append('purpose', purpose);
        if (type) params.append('type', type);
        if (priceMin !== minPrice) params.append('priceMin', String(priceMin));
        if (priceMax !== maxPrice) params.append('priceMax', String(priceMax));
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
        setFormState(parseFormStateFromUrl(urlSearchParams));
    }, [urlSearchParams]);

    const safePriceMin = typeof priceMin === 'number' ? priceMin : Number(priceMin) || minPrice;
    const safePriceMax = typeof priceMax === 'number' ? priceMax : Number(priceMax) || maxPrice;

    const safeBeds = typeof beds === 'number' ? beds : Number(beds) || 0;
    const safeBaths = typeof baths === 'number' ? baths : Number(baths) || 0;

    return (
        <form onSubmit={handleSubmit}>
            <div className={`${styles.search} ${styles[variant]}`}>
                <div className={`${openFilter ? "open" : ""} ${styles.searchFields}`}>
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
                                className="customInput"
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
                                className="customInput"
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
                                            value: capitalize(type ?? ''),
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
                            <div>
                                <Slider
                                    className={styles.customSlider}
                                    value={[safePriceMin, safePriceMax]}
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
                                    <strong>${safePriceMin.toLocaleString('en-US')}</strong>&nbsp;
                                    to&nbsp;
                                    <strong>${safePriceMax.toLocaleString('en-US')}</strong>
                                </p>
                            </div>
                        </label>
                    </div>
                    {variant === 'sidebar' ? (
                        <div className="extraFilters">
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
            <button type="submit" className={`${styles.submit} button`}>Search</button>
        </form>
    );
};

export default Search;