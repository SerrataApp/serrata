import PetitDrapeau from "./PetitDrapeau";

export default function ListeDrapeaux(props) {
    return (
    <div className="flex flex-wrap justify-around">
      {props.drapeaux.map((drapeau, index) => {
        return (
          <PetitDrapeau key={"drapeau"+index} drapeau={drapeau} alt={"drapeau"+index}/>
        );
      })}
    </div>
  );
}