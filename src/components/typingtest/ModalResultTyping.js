import Modal from "../Modal/Modal";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";
import { useContext } from "react";

export default function ModalResultTyping(props) {
    const lang = useContext(LanguageContext).lang;

    const motsParMinute = props.nbMots/props.tempsSelect*60;
    const precision = Math.round(props.nbBons/(props.nbBons+props.nbFaux)*100);

    return (
        <Modal onClose={props.onClose}>
            <div className="flex flex-col text-center gap-3 items-center w-full">
                <span className=" text-3xl md:text-5xl lg:text-6xl">
                    {motsParMinute} mots par minute
                </span>
                <span class="text-lg">
                    {precision}% de précision
                </span>
                <span class="text-lg">
                    Mode : {props.tempsSelect} secondes
                </span>
                <button className="border py-4 w-full rounded-xl transition-all duration-150 bg-gray-100 hover:bg-gray-200" onClick={props.onClose}>{langpack["jou_fermer"][lang]}</button>
            </div>
        </Modal>
    );
}