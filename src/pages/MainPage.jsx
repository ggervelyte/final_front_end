import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

function MainPage() {
    return (
        <>
            <section className='reg'>
                <div className='text'>
                    <h3>Log in</h3>
                </div>
                <LoginForm />
            </section>
            <div className='text'>
                <h4>Don't have an account? <Link to='/register' className='link'> Sign Up! </Link> </h4>
            </div>

        </>
    )
}

export default MainPage
