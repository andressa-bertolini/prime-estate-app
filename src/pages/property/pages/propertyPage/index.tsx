// .propertyBadge {
//     margin-top: 20px;
//   }

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PropertiesService } from "@/services/properties/PropertiesService";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import RelatedProperties from "@/components/RelatedProperties";
import PropertyMap from "@/components/PropertyMap";

import IconSqft from "@/assets/icons/iconSqft";
import IconBed from "@/assets/icons/iconBed";
import IconBath from "@/assets/icons/iconBath";
import IconCheck from "@/assets/icons/IconCheck";
import SadHouse from "@/assets/images/sad-house.png";

const Property = () => {
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const { data: property, isLoading, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => PropertiesService.fetchPropertyById(Number(id)),
        enabled: !!id,
    });

    const slidesPerView = window.innerWidth < 768 ? 1 : 1.5;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
    
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
    
        if (isLeftSwipe) {
            goToNextImage();
        } else if (isRightSwipe) {
            goToPreviousImage();
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
    }>({});

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const goToNextImage = () => {
        if (property?.images) {
            setCurrentImageIndex((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const goToPreviousImage = () => {
        if (property?.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1
            );
        }
    };

    const validateForm = () => {
        const errors: typeof formErrors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            errors.phone = "Phone is required";
        } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
            errors.phone = "Please enter a valid phone number";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const formatPhoneNumber = (value: string) => {
        let cleaned = value.replace(/\D/g, "");
    
        if (cleaned.startsWith("1")) {
            cleaned = cleaned.slice(1);
        }
    
        cleaned = cleaned.slice(0, 10);
    
        if (cleaned.length <= 3) {
            return `+1 (${cleaned}`;
        }
    
        if (cleaned.length <= 6) {
            return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        }
    
        return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "phone") {
            formattedValue = formatPhoneNumber(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", phone: "" });
        }
    };

    useEffect(() => {
        setSubmitSuccess(false);
        setFormData({ name: "", email: "", phone: "" });
        setFormErrors({});
        setCurrentImageIndex(0);
        setModalOpen(false);
    }, [id]);

    if (isLoading) {
        return null;
    }
    
    if (isError || !property) {
        return <div className="not-found">
            <p>Property not found.</p>
            <img src={SadHouse} alt="Sad House" />
        </div>;
    }

    return (
        <div className="property-page">
            <Swiper
                slidesPerView={slidesPerView}
                pagination={{ clickable: true }}
                spaceBetween={15}
                modules={[Navigation]}
                navigation
            >
                {property.images?.map((photo: string, index: number) => (
                    <SwiperSlide key={index}>
                        <img
                            src={photo}
                            alt={property.title}
                            className="property-page__slide"
                            onClick={() => openModal(index)}
                            style={{ cursor: "pointer" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {modalOpen && property.images && createPortal(
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={closeModal}
                            aria-label="Fechar modal"
                        >
                            ✕
                        </button>

                        <div 
                            className="modal-image-container"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <img
                                src={property.images[currentImageIndex]}
                                alt={`${property.title} - ${currentImageIndex + 1}`}
                                className="modal-image"
                            />
                        </div>

                        <div className="modal-navigation">
                            <button
                                className="modal-nav-btn modal-nav-prev"
                                onClick={goToPreviousImage}
                                aria-label="Imagem anterior"
                            >
                                &#10094;
                            </button>
                            <span className="modal-counter">
                                {currentImageIndex + 1} / {property.images.length}
                            </span>
                            <button
                                className="modal-nav-btn modal-nav-next"
                                onClick={goToNextImage}
                                aria-label="Próxima imagem"
                            >
                                &#10095;
                            </button>
                        </div>

                        <div className="modal-thumbnails">
                            {property.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`modal-thumbnail ${
                                        index === currentImageIndex ? "active" : ""
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
            <div className="property-content">
                <div>
                    <div className="property-content__grid">
                        <div>
                            <span className="propertyBadge">
                                {property.purpose === "rent" ? "For Rent" : ""}
                                {property.purpose === "sale" ? "For Sale" : ""}
                            </span>

                            <p className="property-page__price">
                                <strong>
                                    {property.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </strong>
                            </p>

                            <p className="property-features">
                                <span>
                                    {/* <img src={IconSqft2} className="property-icon sqft" alt="Square feet" /> */}
                                    {property.area ? Math.round(property.area) : ""} <strong>sqft</strong>
                                </span>
                                <span>
                                    {/* <img src={IconBed2} className="property-icon bed" alt="Bed" /> */}
                                    {property.bedrooms} <strong>bed{property.bedrooms !== 1 ? 's' : ''}</strong>
                                </span>
                                <span>
                                    {/* <img src={IconBath2} className="property-icon bath" alt="Bath" /> */}
                                    {property.bathrooms} <strong>bath{property.bathrooms !== 1 ? 's' : ''}</strong>
                                </span>
                            </p>

                            <div className="property-page__columns">
                                <div>
                                    <h3>Amenities</h3>
                                    <ul className="property-page__amenities">
                                        {property.amenities?.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="property-content__map">
                            {property.lat && property.long && (
                                <PropertyMap
                                    latitude={property.lat}
                                    longitude={property.long}
                                />
                            )}
                        </div>
                    </div>

                    <h3>Description</h3>
                    <h1>{property.title}</h1>
                    {property.description && <p className="property-page__description">{property.description}</p>}
                </div>
                <div>
                    <div className="property-page__contact">
                        <div className="property-page__contact-wrapper">
                            {property.agency?.logo?.url && (
                                <img src={property.agency.logo.url} alt="Agency Logo" />
                            )}
                            <h3>Interested? Send your information and we will contact you shortly</h3>
                            {submitSuccess ? (
                                <div className="success-message">
                                    <p className="success-title">
                                        <IconCheck className="check-icon" color="#008000" />
                                        Thank you!
                                    </p>
                                    <p className="success-text">
                                        We've received your information. A real estate agent will contact you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <label>
                                        <span>Name *</span>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`input ${formErrors.name ? "input--error" : ""}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                                    </label>

                                    <label>
                                        <span>Email *</span>
                                        <input
                                            type="text"
                                            name="email"
                                            className={`input ${formErrors.email ? "input--error" : ""}`}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com"
                                        />
                                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                    </label>

                                    <label>
                                        <span>Phone *</span>
                                        <input
                                            type="text"
                                            name="phone"
                                            className={`input ${formErrors.phone ? "input--error" : ""}`}
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            maxLength={19}
                                        />
                                        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                                    </label>

                                    <button type="submit" className="button">
                                        Send
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedProperties />
        </div>
    );
};

export default Property;