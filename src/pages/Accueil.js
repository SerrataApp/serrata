export default function Accueil() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-1">
      <h1 className="font-bold">Serrata</h1>
      <h2>Choisir mode</h2>
      <a href="/europe" className="border p-3">Europe</a>
      <a href="/afrique" className="border p-3">Afrique</a>
      <a href="/monde" className="border p-3">Monde</a>
      <h2>Autres</h2>
      <a href="/scores" className="border p-3">Scores</a>
      <a href="/profil" className="border p-3">Profil</a>
    </div>
  );
}