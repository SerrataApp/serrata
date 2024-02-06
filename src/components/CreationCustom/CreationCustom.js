import Page from "../../pages/Page";
import AjoutImage from "./AjoutImage";
import InfosMode from "./InfosMode";

export default function CreationCustom() {
  return (
    <Page titre="Créer un mode de jeu">
      <div className="w-full flex justify-center">
        <div className="w-[80%] md:w-[70%] lg:w-[60%] flex flex-col gap-3">
          <InfosMode/>
          <div className="flex justify-between">
            <span>Total : 12</span>
            <button className="border border-black rounded">+</button>
          </div>
          <AjoutImage/>
        </div>
      </div>
    </Page>
  );
}