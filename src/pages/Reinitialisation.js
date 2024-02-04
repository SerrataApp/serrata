import { useRef, useState } from "react";
import { useParams } from "react-router-dom"
import urlApi from "../utils/urlApi";

export default function Reinitialisation() {
    const { id, token } = useParams();
    const [erreur, setErreur] = useState();

    const refMdp = useRef();
    const refMdp2 = useRef();

    const resetPassword = () => {
        if(refMdp.current.value!==refMdp2.current.value) {
            setErreur("Les mots de passe ne correspondent pas.");
            return;
        }
        const formData = new URLSearchParams();
        formData.append("password", refMdp.current.value);

        fetch("http://localhost:3000/"+`resetpassword/pass-reset/${id}/${token}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: formData
        })
        .then(response => {
            if(response.ok) {
                window.location.href = "/";
            }
        })
    }

    return (
        <div className="flex justify-center w-screen">
            <form onSubmit={resetPassword}>
                <input type="password" ref={refMdp} placeholder="Enter your new password..." />
                <input type="password" ref={refMdp2} placeholder="Confirm your new password..." />
                <input type="submit" value="Reset Password" />
            </form>
            {erreur && <p>{erreur}</p>}
        </div>
    )
}