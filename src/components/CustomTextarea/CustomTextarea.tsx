import "./CustomTextarea.sass"

const CustomTextarea = ({defaultValue, flag, placeholder, setValue, disabled}) => {
    if (flag === 'flight'){
        return (
            <div className="textarea-container">
                <label>{placeholder}</label>
                <textarea placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => setValue(e.target.value)} disabled={disabled} rows="5" cols="40"/>
            </div>
        )
    } else {
        return (
            <div className="textarea-container">
                <label>{placeholder}</label>
                <textarea placeholder={placeholder} value={defaultValue} onChange={(e) => setValue(e.target.value)} disabled={disabled} rows="5" cols="40"/>
            </div>
        )
    }
    
    
}

export default CustomTextarea