// import { useState } from "react";
import "../cssPages/modeldesigns.css";


/*const [a_prey, setAPrey] = useState(0);
const [b_predation, setBPredation] = useState(0);
const [c_predator, setCPredator] = useState(0);
const [d_reproduction, setDReproduction] = useState(0);
const [time, setTime] = useState(0);
const [timeChange, setTimeChange] = useState(0);
const [finalTime, setFinalTime] = useState(0);
const [data, setData] = useState(null);


const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({   
        a_prey: a_prey || "",
        b_predation: b_predation || "",
        c_predator: c_predator || "",
        d_reproduction: d_reproduction || "",
        time: time || "",
        timeChange: timeChange || "",
        finalTime: finalTime || ""
    });

    const response = await fetch(
        `/api/predatorprey?${params.toString()}`
    );*/



export default function PredatorPrey() {
    return (
        <div>
            <h1>Predator-Prey Model</h1>
            {/* coming soon message */}
            <p>Coming soon! This page will allow you to explore the dynamics of predator-prey 
                interactions using the Lotka-Volterra equations. You will be able to input parameters such
                 as growth rates, predation rates, and time settings to see how the populations of predators and prey evolve over time. 
                 Stay tuned for an interactive experience!</p>

            
        </div>
    )
}