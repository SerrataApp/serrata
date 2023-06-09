import TabScores from "../components/scores/TabScores";

export default function Scores() {
  return (
    <>
      <h1 className="text-center underline">Scores</h1>
      <div className="flex justify-around">
        <TabScores categorie="onu"/>
        <TabScores categorie="europe"/>
      </div>
    </>
  );
}