export default function BtnActionUser(props) {
  let style;
  if(props.danger) {
    style = "text-red-600 hover:bg-red-600"
  } else {
    style = "text-green-600 hover:bg-green-600"
  }

  return (
    <button onClick={props.onClick} className={`border flex justify-center items-center w-16 h-16 rounded-xl shadow-sm transition-all duration-300 hover:text-white hover:border-none ${style}`}>
      <i className={`fa fa-${props.icon} fa-2xl`}></i>
    </button>
  );
}