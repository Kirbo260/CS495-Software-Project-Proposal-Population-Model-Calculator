import PMCLogo from "../../assets/pmc-logo.png";
import drSuzanne from "../../assets/dr-suzanne.png";
import loyolaUniversity from "../../assets/loyola-university.png";
import "./About.css";

export default function About() {
    return (
        <div className="about">
            <div className="about-content">
                <div className="about-header">
                    <div className="container">
                        <h1>About us</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="about-body">
                        <p>The Population Model Calculator is a senior Computer Science capstone project

                            created by Justin Dorsey and Oselunosen Ehi-Douglas. The project is a web-based scientific

                            tool that helps users calculate and visualize different population models, including

                            exponential growth, logistic growth, carrying capacity, differential equation-based models,

                            and other population-related calculations.
                        </p>
                        <p>
                            The website is designed to be more than a basic calculator. It includes interactive graphs,

                            simulation playback, model comparison, saved models, account features, dataset uploads,

                            and curve fitting. These tools help students and instructors better understand how population

                            models work and how different values can affect long-term results.</p>
                    </div>
                    <div className="about-grid">
                        <div className="about-grid-content">
                            <h2>Our Goal</h2>
                            <p>Our goal is to create an accessible and easy-to-use platform

                                for learning and working with population models.

                                Many existing population-modeling tools can be difficult to

                                use, hard to access, or require complex software installation.

                                Our project solves this problem by placing the main tools in one

                                organized website.The Population Model Calculator helps

                                reduce user error through structured input forms, tooltips,

                                validation, and clear feedback. It also gives users readable results

                                and visual graphs so they can better understand the calculations

                                instead of only seeing numbers or formulas.</p>
                        </div>
                        <div className="about-grid-image">
                            <img src={PMCLogo} alt="PMC Logo" />
                        </div>
                    </div>
                    <div className="about-grid about-grid-2">
                        <div className="about-grid-image">
                            <img src={drSuzanne} alt="Dr Suzanne" />
                        </div>
                        <div className="about-grid-content">
                            <h2>Our Client</h2>
                            <p>Our client is Dr. Suzanne Keilson, an Associate Professor at Loyola

                                University Maryland. She requested this project to support college

                                students and faculty who work with mathematical population

                                models in coursework or research.The project was chosen

                                after discussing multiple possible ideas with our client.

                                The population model project stood out because it gave us

                                the chance to apply mathematical knowledge while building a

                                useful educational tool. Working with our client helped us decide

                                which features were most important, including model calculations,

                                interactive graphs, account access, saved models, and

                                dataset support.</p>
                        </div>
                    </div>
                    <div className="about-grid">
                        <div className="about-grid-content">
                            <h2>Our College</h2>
                            <p>Loyola University Maryland gave us the opportunity to create

                                this project through our CS496 Computer Science Software

                                Project course. As Computer Science majors, this capstone allowed

                                us to work with a real client and turn classroom knowledge into a

                                working software application.Through Loyola’s Computer Science

                                program, we were able to practice web development,

                                database management, cybersecurity, human-computer interaction,

                                software engineering, and algorithm analysis. This project

                                helped us connect those areas together while creating a tool that

                                can support learning for students and faculty at

                                Loyola University Maryland.</p>
                        </div>
                        <div className="about-grid-image">
                            <img src={loyolaUniversity} alt="Loyola University" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}