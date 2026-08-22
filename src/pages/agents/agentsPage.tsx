import FullBackgroundCTA from "@/sections/FullBackgroundCTA/FullBackgroundCTA";
import HomeKeys from "@/assets/images/home-keys.jpg";

import Agent1 from "@/assets/images/agent1.png";
import Agent2 from "@/assets/images/agent2.png";
import Agent3 from "@/assets/images/agent3.png";
import Agent4 from "@/assets/images/agent4.png";

const agents = [
    {id: 1, name: "John", image: Agent1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."},
    {id: 2, name: "Sarah", image: Agent2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."},
    {id: 3, name: "Ashleigh", image: Agent3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."},
    {id: 4, name: "Peter", image: Agent4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."}
];

const Agents = () => {
    return(
        <div className="container">
            <h1>Realtors</h1>
            <div className="agents__grid">
                {agents.map((agent) => (
                    <div className="agent" key={agent.id}>
                        <img src={agent.image} className="agent-image"/>
                        <h4>{agent.name}</h4>
                        <p>{agent.text}</p>
                    </div>
                ))}
            </div>
            <FullBackgroundCTA
                image={HomeKeys}
                imageAlignment="center bottom"
                text="Prime Estate: Your Trusted Partner in Real Estate"
                buttonText="Learn More"
                link="about-us"
            />
        </div>
    );
}
export default Agents;