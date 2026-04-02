// Model Page to see Loggged in Users previous models and results
//import { useState } from "react";
import { Link } from "react-router-dom";


export default function ModelsPage() {
  return (
    <div>
        <h1>Models Page</h1>
        <p>This page will display the user's previous models and results.</p>
        {/* Future implementation will include fetching and displaying user's models */}
        <Link to="/modelselection">
            <button className="btn-secondary">Go to Model Selection</button>
        </Link>
    </div>
  )
}
