import { useEffect, useState } from "react";

export default function Footer() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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
      <a target="_blank" href="https://github.com/corentinAT/serrata" className="hover:underline text-center w-1/3 md:w-auto">Github</a>
      <a href="/mentionslegales" className="hover:underline text-center w-1/3 md:w-auto">Mentions légales</a>
      <a href="/cgu" className="hover:underline text-center w-1/3 md:w-auto">{innerWidth<768?"CGU":"Conditions générales d'utilisation"}</a>
    </div>
  );
}