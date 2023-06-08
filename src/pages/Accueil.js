export default function Accueil() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1>Choisir mode</h1>
      <a href="/drapeaux_react#/drapeaux_react/europe" className="border p-3">Europe</a>
      <a href="/drapeaux_react#/drapeaux_react/onu" className="border p-3">onu</a>
    </div>
  );
}