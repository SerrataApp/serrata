export default function LienAccueil(props) {
  return(
    <a href={props.href} className="border p-3 bg-secondary rounded">{props.texte}</a>
  );
}