import { AiOutlineStop } from "react-icons/ai";
import "./NoAccess.css";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

export default function NoAccess({ setShowAccessModal }) {
    const NoAcessModalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("triggered")
            if (NoAcessModalRef.current && !NoAcessModalRef.current.contains(event.target)) {

                setShowAccessModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const closeModal = () => {
        setShowAccessModal(false);
    }

    return (
        <div className="access-modal-overlay" onClick={closeModal} ref={NoAcessModalRef}>
            <div className="access-modal" onClick={(event) => event.stopPropagation()}>
                <div className="access-modal-header">
                    <button type="button" className="save-model-close"
                    // onClick={() => setIsSaveModal(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>You Dont Have Access</h2>
                    <span></span>
                </div>
                <div className="access-modal-body">
                    <div className="access-icon">
                        <AiOutlineStop size={200} color="#C47384" />
                    </div>
                    <p>You must sign in or sign up in order to use this feature</p>
                </div>
            </div>
        </div>
    )
}