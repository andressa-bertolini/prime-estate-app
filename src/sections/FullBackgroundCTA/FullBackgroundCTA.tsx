import { Link } from "react-router-dom";
import styles from './FullBackgroundCTA.module.css';

interface FullBackgroundCTAProps{
    image: string;
    imageAlignment: string;
    text: string;
    link: string;
    buttonText: string;
}

const FullBackgroundCTA: React.FC<FullBackgroundCTAProps> = ({image, imageAlignment, text, link, buttonText}) => {
  return (
    <div className={styles.fullBackgroundCTA} style={{backgroundImage: `url(${image})`, backgroundPosition: imageAlignment}}>
        <div>
            <h2>{ text }</h2>
            <Link to={`/${link.replace(/^\/+/, "")}`}>{ buttonText }</Link>
        </div>
    </div>
  )
}

export default FullBackgroundCTA