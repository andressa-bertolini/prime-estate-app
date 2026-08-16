import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@/assets/images/logo-text.png";
import IconBurgerMenu from "@/assets/icons/icon-burger-menu.svg";
import SearchIcon from '@mui/icons-material/Search';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const Navigation = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isTop, setIsTop] = useState(true);
    const navRef = useRef<HTMLElement>(null);

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
          setIsTop(window.scrollY === 0);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!navOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setNavOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [navOpen]);

    const isHomeTop = location.pathname === "/" && isTop;

    return(
        <nav ref={navRef} className={`nav container ${isHomeTop ? "nav-home-top" : ""}`}>
            <NavLink to="/" style={{padding: 0}}><img src={Logo} className="logo" alt="Logo"/></NavLink>
            <div className={(navOpen == true ? "open":"") + " mobile-nav"}>
                <div className="nav-left" onClick={() => setNavOpen(false)}>
                    <NavLink to="/properties?purpose=rent"><strong>Rent</strong></NavLink>
                    <NavLink to="/properties?purpose=sale"><strong>Buy</strong></NavLink> 
                    <NavLink to="/properties">
                        Search
                        <SearchIcon className="search-icon"/>
                    </NavLink>
                </div>              
                <div className="nav-right" onClick={() => setNavOpen(false)}>
                    <NavLink to="/calculator">
                        Calculator
                        <CalculateOutlinedIcon className="search-icon"/>
                    </NavLink>
                    <NavLink to="/realtors">Realtors</NavLink>
                    <NavLink to="/about-us" style={{paddingRight: 0}}>About Us</NavLink>
                </div>
            </div>
            <img src={IconBurgerMenu} className="burger-icon" onClick={() => setNavOpen(!navOpen)} alt="Toggle Menu"/>
        </nav>
    )
}

export default Navigation;