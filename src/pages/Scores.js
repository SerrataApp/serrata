import TabScores from "../components/scores/TabScores";

export default function Scores() {
  return (
    <>
      <h1>Scores</h1>
      <div className="flex">
        <TabScores categorie="onu"/>
        <TabScores categorie="europe"/>
      </div>
    </>
  );
}