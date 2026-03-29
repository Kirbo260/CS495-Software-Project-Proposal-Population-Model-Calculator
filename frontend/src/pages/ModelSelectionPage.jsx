import "../cssPages/selectionpage.css";

function ModelSelectionPage() {
    return (
        <div className="model-selection-page">
            <h1>Choose your Model Calculator</h1>
            <div className="model-buttons">
                <button className="model-btn">
                    <a href="/populationgrowth">Population Growth Rate</a>
                </button>
                <button className="model-btn">
                    <a href="/logisticgrowth">Logistic Growth</a>
                </button>
                <button className="model-btn">
                    <a href="/continuousgrowth">Continuous Growth</a>
                </button>
                <button className="model-btn">
                    <a href="/discretegrowth">Discrete Growth</a>
                </button>
            </div>
        </div>
    );
}

export default ModelSelectionPage;