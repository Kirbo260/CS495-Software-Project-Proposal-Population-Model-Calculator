import { AiOutlineStop } from "react-icons/ai";
import "./ComingSoon.css";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

export default function ComingSoon({ setShowComingSoonModal }) {
    const NoAcessModalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("triggered")
            if (NoAcessModalRef.current && !NoAcessModalRef.current.contains(event.target)) {

                setShowComingSoonModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const closeModal = () => {
        setShowComingSoonModal(false);
    }

    return (
        <div className="access-modal-overlay" onClick={closeModal} ref={NoAcessModalRef}>
            <div className="access-modal" onClick={(event) => event.stopPropagation()}>
                <div className="access-modal-header">
                    <button type="button" className="save-model-close"
                        onClick={() => setShowComingSoonModal(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>Coming Soon</h2>
                    <span></span>
                </div>
                <div className="access-modal-body">
                    <div className="access-icon">
                        <AiOutlineStop size={200} color="#C47384" />
                    </div>
                    <p>This feature is not added to our website, stay tuned for when it does</p>
                </div>
            </div>
        </div>
    )
}