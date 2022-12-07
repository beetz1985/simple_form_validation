import { useEffect, useState } from 'react'
import style from './form.module.css'
import { useValidation } from '../hook/useValidation'

export default function Form() {

    const [formData, setFormData] = useState(intialFormSetUp())
    const [errorData, setErrorData] = useState({})

    const { inputValue, errorRecord, onChange, onBlur } = useValidation()

    //Derived States
    const formDataFull = Object.values(formData).filter(v=>v === '').length === 0;
    const noErrors = Object.values(errorData).filter(v=>v === true).length === 0;
    const readyToSubmit = formDataFull && noErrors;

    useEffect(() => {
        if (Object.values(errorRecord)[0] !== null) setErrorData((s) => ({ ...s, ...errorRecord }))
        setFormData((s) => ({ ...s, ...inputValue }))
    }, [inputValue, errorRecord])

    function handleSubmit(e) {
        e.preventDefault()

        if(!readyToSubmit) return
        
        console.log("SUBMIT")
        console.log(formData)
        setFormData(intialFormSetUp())
        setErrorData({})
    }

    function intialFormSetUp() {
        return {
            firstName: '',
            lastName: '',
            middleName: '',
            age: '',
            email: ''
        }
    }


    return (
        <form noValidate={true} className={style.form} onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <label>
                    {errorData.firstName ? "Please Fill Out Your First Name" : "First Name"}
                </label>
                <input className={errorData.firstName ? style.error : undefined} onBlur={onBlur} onChange={onChange} type="text" name="firstName" value={formData.firstName}/>
            </div>
            <div className={style.inputContainer}>
                <label>
                    {errorData.lastName ? "Please Fill Out Your Last Name" : "Last Name"}
                </label>
                <input className={errorData.lastName ? style.error : undefined} onBlur={onBlur} onChange={onChange} type="text" name="lastName" value={formData.lastName}/>
            </div>
            <div className={style.inputContainer}>
                <label>
                    {errorData.middleName ? "Please Fill Out Your Middle Name" : "Middle Name"}
                </label>
                <input className={errorData.middleName ? style.error : undefined} onBlur={onBlur} onChange={onChange} type="text" name="middleName" value={formData.middleName}/>
            </div>
            <div className={style.inputContainer}>
                <label>
                    {errorData.age ? "Please Fill Out Your Age" : "Age"}
                </label>
                <input className={errorData.age ? style.error : undefined} onBlur={onBlur} onChange={onChange} type="number" name="age" value={formData.age}/>
            </div>
            <div className={style.inputContainer}>
                <label>
                    {errorData.email ? "Please Fill Out Your Email" : "Email"}
                </label>
                <input className={errorData.email ? style.error : undefined} onBlur={onBlur} onChange={onChange} type="email" name="email" value={formData.email}/>
            </div>


            <button disabled={!readyToSubmit}>Submit</button>

        </form>
    )
}