import { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";


export default function Login() {
    const emailRef = useRef()
    const errRef =useRef()
    const[email,setEmail]=useState()
    const[pwd,setPwd]=useState()
    const[errMsg,setErrMsg]=useState()
    const navigate = useNavigate()

    const [login,{isLoading}] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(()=>{
        setErrMsg('')

    },[email,pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const userData = await Login({email,pwd}).unwarp()
            dispatch(setCredentials({...userData,email}))
            setEmail('')
            setPwd('')
            navigate('/')
        } catch (err) {
            if(!err?.originalStatus){
                setErrMsg('No server response')
            }else if(err.originalStatus?.status ===400){
                setErrMsg('missing email or password')
            }else if(err.originalStatus?.status===401){
                setErrMsg('Unautorized')
            }else{
                setErrMsg("Login failed")
            }
            errRef.current.focus();
        }
    }
  return (
    <div>Login</div>
  )
}
