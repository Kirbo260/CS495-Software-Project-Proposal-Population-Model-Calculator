import { Link } from "react-router-dom";
import "./GetStarted.css";

export default function GetStarted() {
    return (
        <div class="get-started">
            <div className="container">
                <div className="get-started-grid">
                    <div className="get-started-content">
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
                    </div>
                    <aside>
                        <ul>
                            <li><Link to="/get-started">Getting started</Link></li>
                            <li><Link to="#">Model tools</Link></li>
                            <li><Link to="#">Account roles</Link></li>
                            <li><Link to="#">Assignment guide</Link></li>
                            <li><Link to="#">Calculator usage</Link></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    )
}