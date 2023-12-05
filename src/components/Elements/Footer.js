export default function Footer() {
  return (
    <div className="w-full bg-gray-100 py-2 flex justify-end gap-4">
      <a target="_blank" href="https://github.com/corentinAT/serrata" className="hover:underline">Github</a>
      <a href="/mentionslegales" className="hover:underline">Mentions légales</a>
      <a href="/cgu" className="hover:underline">Conditions générales d'utilisation</a>
    </div>
  );
}