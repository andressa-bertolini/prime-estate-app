import { NavLink } from "react-router-dom";
import LogoWhite from "@/assets/images/logo-text-white.png";

const Footer = () => {
    return(
        <div className="footer container">
            <NavLink to="/"><img src={LogoWhite} className="logo" alt="Logo"/></NavLink>
            <nav>
                <NavLink to="/properties?purpose=rent">Rent</NavLink>
                <NavLink to="/properties?purpose=sale">Buy</NavLink>
                <NavLink to="/properties?purpose=rent">Search</NavLink>
            </nav>
            <nav>
                <NavLink to="/about-us">About Us</NavLink>
                <NavLink to="/realtors">Realtors</NavLink>
                <NavLink to="/calculator">Calculator</NavLink>
            </nav>
        </div>
    )
}
export default Footer;