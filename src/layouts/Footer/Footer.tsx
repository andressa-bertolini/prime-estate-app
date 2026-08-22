import { NavLink } from "react-router-dom";
import LogoWhite from "@/assets/images/logo-text-white.png";
import styles from './Footer.module.css';

const Footer = () => {
    return(
        <div className={`${styles.footer} container`}>
            <NavLink to="/"><img src={LogoWhite} className={styles.logo} alt="Logo"/></NavLink>
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