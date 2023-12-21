import { useEffect, useState, useContext } from "react";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function Footer() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-gray-100 py-2 flex justify-end items-center gap-3 md:gap-4 pr-5">
      <a target="_blank" href="https://github.com/SerrataApp/serrata" className="hover:underline text-center w-1/3 md:w-auto">{langpack["foot_gh"][lang]}</a>
      <a href="/mentionslegales" className="hover:underline text-center w-1/3 md:w-auto">{langpack["foot_ml"][lang]}</a>
      <a href="/cgu" className="hover:underline text-center w-1/3 md:w-auto">{innerWidth<768?langpack["foot_cgu"][lang]:langpack["foot_cguext"][lang]}</a>
    </div>
  );
}