import { useEffect, useState, memo } from "react";

const Lettre = memo(function Lettre(props) {
  const [estBon, setEstBon] = useState(false);
  const [erreur, setErreur] = useState();

  useEffect(() => {
    if(!props.motActuel && (erreur || !estBon)) {
      props.motEstBon(false);
    }
  }, [props.motActuel]);

  useEffect(() => {
    if(props.motActuel) {
      if(props.index===props.indexCurseur-1 && !props.efface) {
        if(props.input===props.lettre) {
          setEstBon(true);
          props.estBon();
          props.ajouterAuTab(true);
          props.motEstBon(true);
        } else {
          setErreur(true);
          props.estFaux();
          props.ajouterAuTab(false);
        }
      }
      if(props.indexCurseur-1<props.index) {
        setEstBon(false);
        setErreur(null);
      }
    }
  }, [props.input, props.indexCurseur, props.motActuel, props.efface]);

  let style = "text-xl transition-text duration-150";
  if(estBon) {
    style += " text-black";
  }
  if(erreur) {
    style += " text-red-600";
  }
  if(!erreur && !estBon) {
    style += " text-gray-300";
  }

  return (
    <div className="flex">
      {props.motActuel && props.indexCurseur===0 && props.index===props.indexCurseur &&
        <div className="w-px h-6 bg-black"></div>
      }
      <p className={`select-none ${style}`}>
        {props.lettre}
      </p>
      {props.motActuel && props.index===props.indexCurseur-1 &&
        <div className="w-px h-6 bg-black"></div>
      }
    </div>
  );
})

export default Lettre;