export default function InfosMode(props) {
  function changeNomHandler(e) {
    props.dispatchInfosMode({type: "SET_NOM", value: e.target.value});
  }

  function changeLangueHandler(e) {
    props.dispatchInfosMode({type: "SET_LANGUE", value: e.target.value});
  }

  function changeDescHandler(e) {
    props.dispatchInfosMode({type: "SET_DESCRIPTION", value: e.target.value});
  }

  return (
    <div className="bg-gray-100 p-4 rounded flex flex-col px-16">
      <div className="flex flex-col md:flex-row md:justify-between">
        <label className="flex flex-col items-center">
          Nom du mode
          <input type="text" className="border border-black p-1 rounded w-full md:w-[180px]" onChange={changeNomHandler} value={props.infosMode.nom}/>
        </label>
        <label className="flex flex-col items-center">
          Langue
          <select className="bg-white p-1 border border-black rounded w-full md:w-[180px]" onChange={changeLangueHandler} value={props.infosMode.langue}>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col items-center">
        Description
        <textarea rows="4" className="resize-none border border-black rounded p-1 w-full" onChange={changeDescHandler} value={props.infosMode.description}></textarea>
      </label>
      <label className="flex flex-col items-center">
        Vignette
        <input type="file" accept=".png, .jpg, .jpeg"/>
      </label>
    </div>
  );
}