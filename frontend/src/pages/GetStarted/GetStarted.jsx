import { Link } from "react-router-dom";
import Zoom from "../../assets/zoom.png";
import Slider from "../../assets/slider.png";
import SwitchGraph from "../../assets/switch-graph.png";
import SaveModels from "../../assets/save-models.png";
import CV from "../../assets/cv.png";
import Compare from "../../assets/compare.png";
import Close from "../../assets/Close.png";
import "./GetStarted.css";
import FinalPopulationVideo from "../../../ExampleVideos/continuous/finalPopulation.mp4";
import coninitial from "../../../ExampleVideos/continuous/conInitial.mp4";
import conrate from "../../../ExampleVideos/continuous/conRate.mp4";
import contime from "../../../ExampleVideos/continuous/conTime.mp4";
import disfinal from "../../../ExampleVideos/discrete/disFinal.mp4";
import disinitial from "../../../ExampleVideos/discrete/disInitial.mp4";
import disrate from "../../../ExampleVideos/discrete/disRate.mp4";
import distime from "../../../ExampleVideos/discrete/disTime.mp4";



export default function GetStarted() {
    return (
        <div class="get-started">
            <div className="container">
                <div className="get-started-grid">
                    <div className="content">
                        <section id="get-started" className="get-started-content">
                            <h1>Getting Started</h1>
                            <h2>Overview</h2>
                            <p>The Population Model Calculator is a web-based platform designed
                                to help students and instructors explore population modeling concepts
                                through interactive calculations and visualizations.
                                The application supports multiple population models, including
                                exponential growth, logistic growth, carrying capacity, and differential
                                equation–based systems. By combining intuitive inputs with dynamic
                                graphs and simulations, the tool provides a practical and accessible
                                way to analyze population behavior without requiring advanced
                                software installations.</p>
                            <h3>Who it's For</h3>
                            <p>This project is intended for college-level students and faculty working with
                                population models in coursework or research, particularly within probability,
                                statistics, and STEM-related disciplines at Loyola University Maryland.
                                Both students and instructors can benefit from features tailored to their roles.</p>
                            <h3>Getting Started as a User</h3>
                            <p>To begin, users can access the website and choose a population model to run.
                                Parameters are entered through structured, user-friendly forms with
                                built-in validation and tooltips to minimize errors. Once a model is run,
                                the system automatically generates interactive graphs that allow users to
                                zoom, pan, and switch between linear and logarithmic scales..</p>
                        </section>
                        <section id="model-tools" className="get-started-content">
                            <h1>Model Tools</h1>
                            <h2>Overview</h2>
                            <p>The model tools page provides an interactive graphing environment where
                                users can visualize and analyze different growth models.
                                The graph dynamically updates based on the data entered, allowing users to
                                explore how values change over time. Tools alongside the graph enable
                                zooming, adjusting the view with sliders, and modifying inputs to better
                                understand trends. Users can also layer multiple models or compare
                                separate datasets, making it easier to observe differences between
                                growth patterns such as population, logistic, continuous, and discrete models.</p>
                            <h3>Features</h3>
                            <h4>Zoom Controls:</h4>
                            <p>These buttons allow users to zoom in and out of the graph, making it easier to
                                focus on specific sections of the data or view the overall trend more clearly.</p>
                            <img src={Zoom} alt="Zoom" />
                            <h3>Data Input/Model Selection</h3>
                            <p>Users can input different datasets and select from models such as
                                Continuous Growth, Population Growth, Logistic Growth, and Discrete Growth.
                                The graph updates instantly to reflect the selected model and values</p>
                            <img src={SwitchGraph} alt="Switch Graph" />
                            <h3>Graph Slider (Navigation Tool):</h3>
                            <p>
                                The slider lets users shift the graph view horizontally or vertically,
                                helping them explore different ranges of the data without changing
                                the dataset itself.
                            </p>
                            <img src={Slider} alt="Slider" />
                            <h3>Curve Fitting Models:</h3>
                            <p>
                                This tool allows users to add another model onto the current graph.
                                Each model appears as a different colored line, making it easier to compare
                                how well different models fit the same data.
                            </p>
                            <img src={CV} alt="CV" />
                            <h3>Compare / Add Models:</h3>
                            <p>Users can compare multiple saved models by displaying them together on
                                the same page. This feature helps analyze differences and similarities
                                between datasets visually.</p>
                            <img src={Compare} alt="Compare" />
                            <h3>Save / Exit Models:</h3>
                            <p>
                                This option allows users to save their current model by assigning it a name. It also provides a way to exit the graphing page and return to the home screen while keeping saved data for later use.
                            </p>
                            <img src={Close} alt="Close" />
                        </section>
                        <section id="example-models" className="get-started-content">
                            <h1>Example models</h1>
                            <p>
                                Browse tutorials for each population model and parameter.
                                Click a section to expand and access the related videos.
                            </p>

                            <div className="video-accordion">

                                <details className="accordion-item">
                                    <summary>Continuous Growth Model</summary>

                                    <div className="accordion-content">
                                        <div className="accordion-video">
                                            <h4>Calculate Growth Rate</h4>

                                            <video controls>
                                                <source src={conrate} type="video/mp4" />
                                            </video>
                                        </div>

                                        <div className="accordion-video">
                                            <h4>Calculate Final Population</h4>

                                            <video controls>
                                                <source src={FinalPopulationVideo} type="video/mp4" />
                                            </video>
                                        </div>

                                        <div className="accordion-video">
                                            <h4>Calculate Time</h4>

                                            <video controls>
                                                <source src={contime} type="video/mp4" />
                                            </video>
                                        </div>


                                        <div className="accordion-video">
                                            <h4>Calculate Initial Population</h4>

                                            <video controls>
                                                <source src={coninitial} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                </details>

                                <details className="accordion-item">
                                    <summary>Discrete Growth Model</summary>

                                    <div className="accordion-content">
                                        <div className="accordion-video">
                                            <h4>Calculate Rate</h4>

                                            <video controls>
                                                <source src={disrate} type="video/mp4" />
                                            </video>
                                        </div>

                                        <div className="accordion-video">
                                            <h4>Calculate Final Population</h4>

                                            <video controls>
                                                <source src={disfinal} type="video/mp4" />
                                            </video>
                                        </div>

                                        <div className="accordion-video">
                                            <h4>Calculate Time</h4>

                                            <video controls>
                                                <source src={distime} type="video/mp4" />
                                            </video>
                                        </div>


                                        <div className="accordion-video">
                                            <h4>Calculate Initial Population</h4>

                                            <video controls>
                                                <source src={disinitial} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                </details>

                                <details className="accordion-item">
                                    <summary>Logistic Growth Model</summary>

                                    <div className="accordion-content">
                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Calculate Growth Rate
                                        </a>

                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Calculate Final Population
                                        </a>

                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Calculate time
                                        </a>


                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Initial Population
                                        </a>

                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Calculate Carrying Capacity
                                        </a>
                                    </div>
                                </details>

                                <details className="accordion-item">
                                    <summary>Predator-Prey Model</summary>

                                    <div className="accordion-content">
                                        <a
                                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_LINK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Predator-Prey values
                                        </a>
                                    </div>
                                </details>
                            </div>
                        </section>
                    </div>
                    <aside>
                        <ul>
                            <li><a href="#get-started">Getting started</a></li>
                            <li><a href="#model-tools">Model tools</a></li>
                            <li><a href="#example-models">Example models</a></li>
                            <li><a href="#sharing-guide">Sharing guide</a></li>
                            <li><a href="#">Calculator usage</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    )
}