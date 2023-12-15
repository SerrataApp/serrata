export default function BtnActionUser(props) {
  return (
    <button onClick={props.action} className="border flex justify-center items-center w-16 h-16 rounded-xl shadow-sm  text-red-600 transition-all duration-300 hover:text-white hover:bg-red-600">
      <i className={`fa fa-${props.icon} fa-2xl`}></i>
    </button>
  );
}