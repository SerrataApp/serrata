import PetitDrapeau from "./PetitDrapeau";

export default function ListeDrapeaux(props) {
    return (
    <div className="flex flex-wrap justify-around">
      {props.drapeaux.map(drapeau => {
        return (
          <PetitDrapeau key={drapeau.nom} drapeau={drapeau}/>
        );
      })}
    </div>
  );
}