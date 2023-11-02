import Header from "../components/Elements/Header";

export default function Page(props) {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
}