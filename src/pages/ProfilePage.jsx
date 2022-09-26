import React, { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import MainContext from '../context/mainContext';
import { useNavigate } from 'react-router-dom';


function ProfilePage() {
    const { user, setUser } = useContext(MainContext)
    const [error, setError] = useState(null)
    const nav = useNavigate()

    let imgRef = useRef()



    function uploadImg() {
        const imgUrl = {
            username: user.username,
            url: imgRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(imgUrl)
        }

        fetch("http://localhost:4000/upload", options)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.message)
                } else if (!data.error) {
                    setUser(data.data.user)
                }

                if (user.image.length >= 2) {
                    nav('/filter')
                } else {
                    setError('Upload minimum 2 images!')
                }
                console.log(data)
            })
        imgRef.current.value = ""
    }

    return (
        <main className='profile-page'>
            <div className='profile-page-text'>
                <h3>user: {user.username}</h3>
            </div>
            <section className='swipe'>
                <Swiper
                    modules={[Navigation, EffectFade]}
                    navigation
                    effect={'fade'}
                    speed={800}
                    slidesPerView={1}
                >
                    {user.image.map((x, i) => <SwiperSlide key={i} className='swipers-slide'>
                        <img src={x} alt="" />
                    </SwiperSlide>)}

                    {/* <SwiperSlide className='swipers-slide'>
                        <img src={user.image[3]} alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='swipers-slide'>
                        <img src={user.image[4]} alt="" />
                    </SwiperSlide> */}
                </Swiper>
            </section>
            <div className='profile-add-img'>
                <input ref={imgRef} type="text" placeholder='Place Your Image URL...' />
            </div>
            <button onClick={uploadImg}>Add Photos</button>
            <div className='error'>
                {error && <span>{error}</span>}

            </div>
        </main>

    )
}

export default ProfilePage
