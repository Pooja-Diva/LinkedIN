import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyMessage } from '@/config/redux/reducer/authReducer'
import styles from "./style.module.css";
import { loginUser, registerUser } from '@/config/redux/action/authAction';

export default function LoginComponent() {

    const authState = useSelector((state) => state.auth)
    const router = useRouter();
    const dispatch = useDispatch();
    const [userLoginMethod, setUserLoginMethod] = useState(false);
    const [email, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if(authState.loggedIn) {
          router.push("/dashboard")
        }
    },[authState.loggedIn])

    useEffect(() => {
      if(localStorage.getItem("token")) {
         router.push("/dashboard")
      }
    }, [])

    useEffect(() => {
        dispatch(emptyMessage())
    }, [userLoginMethod])

    useEffect(() => {
  if (authState.isSuccess || authState.isError) {
    const timer = setTimeout(() => dispatch(emptyMessage()), 4000); // wait 4 seconds
    return () => clearTimeout(timer); // cleanup
  }
}, [authState.isSuccess, authState.isError, dispatch]);


     const handleRegister = async() => {
        console.log("registering..");
        dispatch(registerUser({ username, password, email, name }));
};

     const handleLogin = () => {
        console.log("login...");
        dispatch(loginUser({ email, password}))
     }

  return (
    <UserLayout>
      <div className={styles.container}>
        
        <div className={styles.cardContainer}>

           <div className={styles.cardContainer__left}>
             <p className={styles.cardLeft__heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>

              <p style={{color: authState.isError ? "red" : "green"}}>{authState.message?.message || "" }</p>

              <div className={styles.inputContainers}>
                 
                 {!userLoginMethod && <div className={styles.inputRow}>
                    <input onChange={(e) => setUsername(e.target.value)} className={styles.inputField} type='text' placeholder='Username' />
                    <input onChange={(e) => setName(e.target.value)} className={styles.inputField} type='text' placeholder='Name' />
                 </div>}
                 
                 <input onChange={(e) => setEmailAddress(e.target.value)} className={styles.inputField} type='text' placeholder='Email' />
                 <input onChange={(e) => setPassword(e.target.value)} className={styles.inputField} type='text' placeholder='Password' />

                  <div onClick={() => {
                     if(userLoginMethod) {
                        handleLogin();
                     } else {
                        handleRegister();
                     }
                  }} className={styles.buttonWithOutline}>
                     <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                  </div>

              </div>

           </div>

           <div className={styles.cardContainer__right}>
            
                {userLoginMethod ? <p>Don't Have a Account?</p> : <p>Already Have an Account?</p>}
            
               <div onClick={() => {
                     setUserLoginMethod(!userLoginMethod)
                  }} style={{color: "black", textAlign: "center"}} className={styles.buttonWithOutline}>
                     <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
                  </div>
            
           </div>

        </div>
      </div>

    </UserLayout>
  )
}
