import IconTeam from '@assets/icons/IconTeam'

import IconTeam2 from "@assets/icons/icon-team.svg";
import IconTeamWhite from "@assets/icons/icon-team-white.svg";
import IconHandshake from "@assets/icons/icon-handshake.svg";
import IconHandshakeWhite from "@assets/icons/icon-handshake-white.svg";
import IconBulb from "@assets/icons/icon-bulb.svg";
import IconBulbWhite from "@assets/icons/icon-bulb-white.svg";

type AboutTopicsProps = {
    iconsColor?: "white";
};

const AboutTopics = ({ iconsColor }: AboutTopicsProps) => {
  return(
    <div className="home-about__topics">
        <div>
            <IconTeam color="white" />
            <img src={iconsColor === 'white' ? IconTeamWhite : IconTeam2} alt="Team"/> 
            <h4>Expert Guidance</h4>
            <p>Our experienced real estate professionals are here to assist you every step of the way, whether you're buying, selling, or renting.</p>
        </div>
        <div>
            <img src={iconsColor === 'white' ? IconHandshakeWhite : IconHandshake} alt="Handshake"/> 
            <h4>Personalized Service</h4>
            <p>We understand that every client is unique, and we tailor our services to match your specific needs and preferences.</p>
        </div>
        <div>
            <img src={iconsColor === 'white' ? IconBulbWhite : IconBulb} alt="Bulb"/> 
            <h4>Seamless Experience</h4>
            <p>With cutting-edge technology and market insights, we make property searching and transactions smooth, efficient, and stress-free.</p>
        </div>
    </div>);
};

export default AboutTopics;