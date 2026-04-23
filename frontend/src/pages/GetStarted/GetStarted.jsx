import { Link } from "react-router-dom";
import Zoom from "../../assets/zoom.png";
import Slider from "../../assets/slider.png";
import SwitchGraph from "../../assets/switch-graph.png";
import SaveModels from "../../assets/save-models.png";
import CV from "../../assets/cv.png";
import Compare from "../../assets/compare.png";
import Close from "../../assets/Close.png";
import "./GetStarted.css";

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
                            <h1>Video Explanation</h1>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/9xwazD5SyVg?si=YROPyZxaW-WG9XW8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <h2>Video description:</h2>
                            <p>The graphing calculator page provides four different types of datasets to
                                model real-world growth. The Population Growth Rate model focuses on how
                                quickly a population changes over time using a rate-based approach.
                                The Logistic Growth model represents growth that starts rapidly but slows
                                down as it approaches a maximum limit, known as carrying capacity.
                                The Continuous Growth model assumes data changes smoothly at every
                                moment, typically following an exponential pattern. In contrast,
                                the Discrete Growth model represents changes at specific intervals
                                (such as yearly or monthly), making it useful for step-by-step data analysis.</p>
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