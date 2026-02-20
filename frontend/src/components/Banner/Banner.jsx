import { IoIosSearch } from "react-icons/io";
import "./Banner.css"

const Banner = ({title, subtitle, showSearch = false, backgroundImage}) => {
    return (
        <div className={`banner ${backgroundImage ? "has-bg": "no-bg"}`} style={{backgroundImage: backgroundImage ? `url(${backgroundImage})`: "none"}}>
            <div className="container">
                <div className="banner-content">
                    <h1>{title}</h1>
                    {subtitle && <p className="subtitle">{subtitle}</p>}
                    {showSearch && (<form>
                        <IoIosSearch />
                        <input type="text" placeholder="Search" />
                    </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Banner;