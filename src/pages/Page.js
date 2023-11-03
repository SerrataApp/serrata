import Header from "../components/Elements/Header";

export default function Page(props) {
  return (
    <>
      <Header/>
      <h2 className="text-center my-4 text-xl">{props.titre}</h2>
      {props.children}
    </>
  );
}