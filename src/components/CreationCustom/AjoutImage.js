import { useRef } from "react";
import Input from "../Elements/Input";

export default function AjoutImage(props) {
  const nomRef = useRef();
  const alias1Ref = useRef();
  const alias2Ref = useRef();

  function supprimer() {
    props.supprimer(props.index);
  }

  function modifierAttibut(attribut, ref) {
    props.modifierAttibut(props.index, attribut, ref.current.value)
  }

  return (
    <div className="w-full bg-gray-100 rounded p-1 flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between">
      <Input label="Image" type="file" obligatoire={true} class="border-none" accept=".png, .jpg, .jpeg"/>
      <Input onChange={() => {modifierAttibut("nom", nomRef)}} reference={nomRef} label="Nom principal" type="text" obligatoire={true} autofocus={true}/>
      <Input onChange={() => {modifierAttibut("alias1", alias1Ref)}} reference={alias1Ref} label="Alias 1" type="text"/>
      <Input onChange={() => {modifierAttibut("alias2", alias2Ref)}} reference={alias2Ref} label="Alias 2" type="text"/>
      <button onClick={supprimer} className="bg-red-500 hover:bg-red-400 rounded transition-bg duration-150 h-fit p-2 self-center">Supprimer</button>
    </div>
  );
}