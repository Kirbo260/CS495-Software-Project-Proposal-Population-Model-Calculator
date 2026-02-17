export default function HomePage() {
    return (
        <div>
            <h1>Welcome to the Population Model Calculator</h1>
            <p>Use this tool to calculate population growth using various models.</p>

            <h2>Available Models:</h2>
            <ul>
                <li><a href="/exponentialgrowth">Exponential Growth Model</a></li>\
                <li><a href="/populationgrowth">Population Growth Model</a></li>
                {/* Future models can be added here */}
            </ul>

            <p>Click on a model to get started!</p>

    
        </div>
    );
}
