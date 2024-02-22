import Modal from "../Modal/Modal";
import urlApi from "../../utils/urlApi";
import { useState } from "react";

export default function ModalCreerMode(props) {
  const [isLoading, setIsLoading] = useState(false);

  async function posterMode() {
    setIsLoading(true);
  
    try {
      let imageList = [];
  
      for (let image of props.images) {
        let name = [image.nom];
        if (image.alias1) {
          name = [...name, image.alias1];
        }
        if (image.alias2) {
          name = [...name, image.alias2];
        }
        imageList = [
          ...imageList,
          {
            name: name,
            img: image.img.name,
          },
        ];
      }
      console.log(imageList);
  
      const response = await fetch(urlApi + "gameMode/all", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: props.infosMode.nom,
          description: props.infosMode.description,
          lang: props.infosMode.langue,
          imageList: imageList,
        }),
      });
  
      const data = await response.json();
  
      for (let i in data.imagesURL) {
        const imageBuffer = props.images[i].img;
        await fetch(data.imagesURL[i], {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: imageBuffer,
          }),
        });
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error("Error in posterMode:", error);
      // Handle errors as needed
      setIsLoading(false);
    }
  }

  function onClose() {
    if(!isLoading) {
      props.onClose()
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-lg">Confirmer la création</h3>
        <table className="w-full text-center border">
          <tr>
            <td className="p-3 border-r w-1/3">{props.images.length} image{`${props.images.length>1?"s":""}`}</td>
            <td className="p-3 border-r w-1/3">{props.infosMode.nom}</td>
            <td className="p-3 w-1/3">{props.infosMode.langue}</td>
          </tr>
        </table>
        {!isLoading && 
          <form method="dialog">
            <div className="flex gap-2 justify-end">
              <button onClick={onClose} className="bg-red-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-red-500">Annuler</button>
              <button onClick={posterMode} className="bg-green-400 py-3 px-4 rounded-xl transition-bg duration-150 hover:bg-green-500">Confirmer</button>
            </div>
          </form>
        }
        {isLoading && <span className="loading loading-spinner self-center"></span>}
      </div>
    </Modal>
  );
}