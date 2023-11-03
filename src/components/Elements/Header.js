export default function Header() {
  return(
    <div className="w-full bg-secondary p-4 flex justify-between">
      <a href="/"><h1 className="select-none">Serrata</h1></a>
      <div className="flex gap-5">
        <a href="/" className="text-blue-700 hover:underline">Jouer</a>
        <a href="/scores" className="text-blue-700 hover:underline">Scores</a>
        <a href="/profil" className="text-blue-700 hover:underline">Profil</a>
      </div>
    </div>
  );
}