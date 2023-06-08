import PetitDrapeau from "./PetitDrapeau";

export default function ListeDrapeaux(props) {
    return (
    <div className="flex flex-wrap">
      {props.drapeaux.map(drapeau => {
        return (
          <PetitDrapeau key={drapeau.nom} drapeau={drapeau}/>
        );
      })}
    </div>
  );
}