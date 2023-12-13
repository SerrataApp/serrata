import Footer from "../components/Elements/Footer";
import Header from "../components/Elements/Header";

export default function Page(props) {
  return (
    <main className="h-full flex flex-col justify-between">
      <div>
        <Header/>
        <h2 className="text-center my-4 text-xl break-words">{props.titre}</h2>
        {props.children}
      </div>
      <Footer/>
    </main>
  );
}