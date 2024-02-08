import "./CustomInput.sass"

const CustomInput = ({placeholder, defaultValue, setValue, disabled, flag}) => {
    if (flag === 'flight'){
        return (
            <div className="input-container">
                <label>{placeholder}</label>
                <input placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
            </div>
        )
    }
    else {
        return (
                <div className="input-container">
                    <label>{placeholder}</label>
                    <input placeholder={placeholder} value={defaultValue} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
                </div>
            )
    }
    
}

export default CustomInput