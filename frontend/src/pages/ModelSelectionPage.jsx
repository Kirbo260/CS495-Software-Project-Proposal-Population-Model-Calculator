// Page to Select Model Type and Input Parameters for Calculation
// import { useState } from "react";

function ModelSelectionPage() {
    return (
        <div className="model-selection-page">
            <h1>Choose your Model Calculator</h1>
            <button><a href="/populationgrowth">Population Growth Rate</a></button>
            <button><a href="/logisticgrowth">Logistic Growth</a></button>
            <button><a href="/exponentialgrowth">Exponential Growth</a></button>
        </div>
    );
}

export default ModelSelectionPage;