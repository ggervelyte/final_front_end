import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const usernameRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()
    const cityRef = useRef()
    const genderRef = useRef()
    const yearRef = useRef()
    const nav = useNavigate()
    const [error, setError] = useState(null)

    function handleRegister() {
        const user = {
            username: usernameRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value,
            city: cityRef.current.value,
            gender: genderRef.current.value,
            year: yearRef.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:4000/register", options)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.message)
                } else if (!data.error) {
                    nav('/')
                }
                console.log(data)
            })
    }

    return (
        <main className='reg'>
            <div className='text'>
                <h3>Register</h3>
            </div>
            <section className='reg-form-panel-2'>
                <label htmlFor="username">Username</label>
                <input ref={usernameRef} type="text" name='username' placeholder='Enter Username...' />
                <label htmlFor="password">Password</label>
                <input ref={passOneRef} type="text" name='password' placeholder='Enter password...' />
                <label htmlFor="password">Repeat Password</label>
                <input ref={passTwoRef} type="text" name='password' placeholder='Enter password...' />
                <label htmlFor="city">City</label>
                <input ref={cityRef} type="text" name='city' placeholder='Enter Your City...' />
                <label htmlFor="gender">Gender</label>
                <input ref={genderRef} type="text" name='gender' placeholder='Enter Your Gender...' />
                <label htmlFor="years">Years</label>
                <input ref={yearRef} type="text" name='years' placeholder='Enter Your age...' />
                <button onClick={handleRegister}>Register</button>
                <div className='error'>
                    {error && <span>{error}</span>}
                </div>
            </section>

        </main>
    )
}

export default RegisterPage
