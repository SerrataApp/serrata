import Stat from "./Stat";

export default function ResumeStats(props) {
  return (
    <div>
      <Stat nom="Parties lancées" valeur="12"/>
      <Stat nom="Parties terminées" valeur="8"/>
      <Stat nom="Temps moyen" valeur="1:44"/>
    </div>
  );
}