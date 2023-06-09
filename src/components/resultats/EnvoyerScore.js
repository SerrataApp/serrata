export default function EnvoyerScore(props) {
  return (
    <form className="flex flex-col border">
      <label for="nom">Votre nom</label>
      <input type="text" id="nom"/>
      <input type="submit" value="Envoyer"/>
    </form>
  );
}