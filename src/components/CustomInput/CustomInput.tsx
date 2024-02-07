import "./CustomInput.sass"

const CustomInput = ({placeholder, defaultValue, setValue, disabled}) => {
    return (
        <div className="input-container">
            <label>{placeholder}</label>
            <input placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
        </div>
    )
}

export default CustomInput