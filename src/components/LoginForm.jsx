import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/mainContext'

function LoginForm() {
    const { setUser, setLikedUsers } = useContext(MainContext)
    const [error, setError] = useState(null)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const nav = useNavigate()

    function handleLog() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: "include"
        }

        fetch('http://localhost:4000/login', options)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.message)
                } else if (!data.error) {
                    setUser(data.data.user)
                    setLikedUsers(data.data.likes)
                    console.log(data.data.user)
                    nav('/profile')
                }
                console.log(data)
            })
    }

    

    return (
        <section className='reg-form-panel'>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} type="text" name='username' placeholder='Enter Your Username...' />
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="text" name='password' placeholder='Enter Your Password...' />
            <div className='check'>
                <input type="checkbox" /><span>Stay logged in</span>
            </div>
            <button onClick={handleLog}>Log In</button>
            <div className='error'>
                {error && <span>{error}</span>}
            </div>
        </section>
    )
}

export default LoginForm
