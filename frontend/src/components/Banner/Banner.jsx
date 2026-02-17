import { IoIosSearch } from "react-icons/io";

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="banner-content">
                    <h1>In what help do you need from us?</h1>
                    <form>
                        <IoIosSearch />
                        <input type="text" placeholder="Search" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Banner;