export default function Input(props) {
  return (
    <label className="flex flex-col items-center">
      <span>{props.label}{props.obligatoire && <span className="text-red-500">*</span>}</span>
      <input autoFocus={props.autofocus} onChange={props.onChange} ref={props.reference} className={`max-w-[180px] p-1 bg-white border border-black rounded ${props.class}`} type={props.type} accept={props.accept}/>
    </label>
  );
}