import { useEffect, useState } from "react";

export default function Lettre(props) {
  const [estBon, setEstBon] = useState(false);
  const [erreur, setErreur] = useState();

  useEffect(() => {
    if(props.index===props.indexCurseur-1 && !props.efface) {
      if(props.input===props.lettre) {
        setEstBon(true);
        props.estBon();
      } else {
        setErreur(true);
        props.estFaux();
      }
    }
    if(props.indexCurseur-1<props.index) {
      setEstBon(false);
      setErreur(null);
    }
  }, [props.input, props.indexCurseur]);

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
      {props.index===props.indexCurseur &&
        <div className="w-px h-6 bg-black"></div>
      }
      <p className={style}>
        {props.lettre}
      </p>
    </div>
  );
}