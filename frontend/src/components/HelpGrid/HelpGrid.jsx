import { FaCheck } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { CiPen } from "react-icons/ci";
import { TbNumber123 } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";


const HelpGrid = () => {
  return (
    <div className="help-grid">
        <div className="container">
            <div className="help-grid-boxes">
                <div className="help-box">
                    <FaCheck />
                    <h3>Getting Started</h3>
                    <FaArrowRight />
                </div>
                <div className="help-box">
                    <CiViewTable />
                    <h3>Model Tools</h3>
                    <FaArrowRight />
                </div>
                <div className="help-box">
                    <CiUser />
                    <h3>Account roles</h3>
                    <FaArrowRight />
                </div>
                <div className="help-box">
                    <FiBook />
                    <h3>ABout PMC</h3>
                    <FaArrowRight />
                </div>
                <div className="help-box">
                    <CiPen />
                    <h3>Assignment guide</h3>
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