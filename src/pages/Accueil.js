export default function Accueil() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1>Choisir mode</h1>
      <a href="/europe" className="border p-3">Europe</a>
      <a href="/afrique" className="border p-3">Afrique</a>
      <a href="/onu" className="border p-3">ONU</a>
      {/* <a href="/scores" className="border p-3">Scores</a> */}
    </div>
  );
}