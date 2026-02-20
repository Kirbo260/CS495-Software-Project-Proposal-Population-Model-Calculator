import Banner from "../components/Banner/Banner";
import homeBanner from "../assets/home-banner-1.png";
import Menus from "../components/Menus/Menus";

export default function HomePage() {
    return (
        <div>
            <Banner 
                title="Welcome to PMC"
                subtitle="Explore population models with interactive simulations and graphs"
                backgroundImage={homeBanner}
            />
            <Menus />
        </div>
    );
}
