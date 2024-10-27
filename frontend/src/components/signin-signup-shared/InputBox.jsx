

function InputBox({label,placeholder, onChange, value}  ){
  return (
    <div className='px-8 pt-2'>
        <label className='text-white  block text-xl py-1 font-semibold'>{label}</label>
        <input className='bg-slate-100 font-normal  text-xl md:text-lg p-2 md:p-3 w-full rounded-md outline-blue-500' value={value} onChange={onChange} type="text" placeholder={placeholder}/>
    </div>
  )
}

export default InputBox
