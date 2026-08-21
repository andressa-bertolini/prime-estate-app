import AboutTopics from "src/sections/AboutTopics/AboutTopics";
import FullBackgroundCTA from "src/sections/FullBackgroundCTA/FullBackgroundCTA";

import Office from "@/assets/images/office.png";
import HomeKeys from "@/assets/images/home-keys.jpg";

const About = () => {
  return(
    <div className="container" style={{paddingBottom: '40px'}}>
      <h1>About Us</h1>
      <div className="about-us-grid">
        <div className="about-us-grid__info">
          <img src={Office} alt="Office" className="office-img"/>
          <p>At PrimeEstate, we believe that finding the perfect property should be an exciting and empowering journey — not a stressful one. That’s why we’ve built a platform that combines technology, market expertise, and a deep understanding of our clients’ needs to deliver a seamless and rewarding experience from start to finish.</p>
          <p>Our team is made up of seasoned real estate professionals who are passionate about helping people move forward — whether you're buying your first home, investing in new opportunities, or looking for the ideal rental. We don’t believe in one-size-fits-all solutions. Instead, we listen carefully and offer tailored guidance based on your goals, preferences, and lifestyle.</p>
        </div>
        <AboutTopics iconsColor="white"/>
        <FullBackgroundCTA
          image={HomeKeys}
          imageAlignment="center bottom"
          text="Your Perfect Home Awaits: Meet the Realtors Who Can Help"
          buttonText="Learn More"
          link="realtors"
      />
      </div>
    </div>
  );
}
export default About;