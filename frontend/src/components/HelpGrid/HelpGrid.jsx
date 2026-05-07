import { FaCheck } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { CiPen } from "react-icons/ci";
import { TbNumber123 } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import "./HelpGrid.css"
import { Link } from "react-router-dom";

const HelpGrid = () => {
  return (
    <div className="help-grid">
        <div className="container">
            <div className="help-grid-boxes">
                <div className="help-box">
                    <FaCheck />
                    <h3>Getting Started</h3>
                    <Link to="/get-started"><FaArrowRight /></Link>
                </div>
                <div className="help-box">
                    <CiViewTable />
                    <h3>Model Tools</h3>
                    <Link to="/get-started"><FaArrowRight /></Link>
                </div>
                <div className="help-box">
                    <CiUser />
                    <h3>Example Models</h3>
                    <Link to="/get-started"><FaArrowRight /></Link>
                </div>
                <div className="help-box">
                    <FiBook />
                    <h3>About PMC</h3>
                    <Link to="/about-us"><FaArrowRight /></Link>
                </div>
                <div className="help-box">
                    <CiPen />
                    <h3>Sharing guide</h3>
                    <FaArrowRight />
                </div>
                <div className="help-box">
                    <TbNumber123 />
                    <h3>Calculator usage</h3>
                    <FaArrowRight />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HelpGrid