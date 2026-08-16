import IconTeam from '@/assets/icons/IconTeam';
import IconHandshake from '@/assets/icons/IconHandshake';
import IconBulb from '@/assets/icons/IconBulb';

type AboutTopicsProps = {
    iconsColor?: "white";
};

const topics = [
    {
        icon: IconTeam,
        title: "Expert Guidance",
        description: "Our experienced real estate professionals are here to assist you every step of the way, whether you're buying, selling, or renting."
    },
    {
        icon: IconHandshake,
        title: "Personalized Service",
        description: "We understand that every client is unique, and we tailor our services to match your specific needs and preferences."
    },
    {
        icon: IconBulb,
        title: "Seamless Experience",
        description: "With cutting-edge technology and market insights, we make property searching and transactions smooth, efficient, and stress-free."

    }
];

const AboutTopics = ({ iconsColor }: AboutTopicsProps) => {
  return(
    <div className="home-about__topics">
        {topics.map((topic) => {
            const Icon = topic.icon;

            return (
                <div key={topic.title}>
                    <Icon color={iconsColor === 'white' ? 'white' : undefined} />
                    <h4>{topic.title}</h4>
                    <p>{topic.description}</p>
                </div>
            );
        })}
    </div>);
};

export default AboutTopics;