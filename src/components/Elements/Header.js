export default function Header() {
  return(
    <div className="w-screen max-w-screen bg-secondary p-4 flex justify-between">
      <a href="/"><h1 className="select-none">Serrata</h1></a>
      <div>
        <a href="/scores" className="text-blue-700 hover:underline">Scores</a>
        <a href="/profil" className="ml-5 text-blue-700 hover:underline">Profil</a>
      </div>
    </div>
  );
}