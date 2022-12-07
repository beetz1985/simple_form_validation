import { useState, useEffect } from "react"

export function useValidation() {

    const [input, setInput] = useState({});
    const [touched, setTouched] = useState(false);
    const [errorRecord, setErrorRecord] = useState({})

    

    useEffect(()=>{

        const inputName = Object.keys(input)[0]
        const stringError = (inputName !== undefined) ? input[inputName] === '' ? true : false : null
        const hasError = stringError && touched
        setErrorRecord({[inputName]: hasError})

    }, [input, touched])

    function onBlur(e) {
        setTouched(true)
        const {value, name} = e.target;
        setInput({[name]: value})
    }

    function onChange(e) {
        setTouched(true)
        const {value, name} = e.target;
        setInput({[name]: value})
    }

    return {
        inputValue: input,
        errorRecord,
        onChange,
        onBlur
    }
}