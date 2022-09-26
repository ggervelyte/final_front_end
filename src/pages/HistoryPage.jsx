import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { useEffect } from 'react';
import { useContext } from 'react';
import MainContext from '../context/mainContext';

function HistoryPage() {
    const { likedUsers, setLikedUsers, likes, setLikes } = useContext(MainContext)

    useEffect(() => {
         const options = {
            method: "GET",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify()
        }

        fetch('http://localhost:4000/getLikes', options)
            .then(res => res.json())
            .then(data => {
                setLikes(data.data.allLikes)
                console.log(data.data.allLikes)
            })
    }, [])

    console.log(likedUsers);
    return (
        <section className='history-pg'>
            <div className='history-top'>
                <h3>People I liked {likes.length}</h3>
                <h3>People who liked me (2)</h3>
            </div>
            <main className='wrapper'>
                
                {likes.map((x, i) => <section className='history-swiper'> <Swiper key={i}
                            modules={[Navigation, EffectFade]}
                            navigation
                            effect={'fade'}
                            speed={800}
                            slidesPerView={1}
                        >
                            {x.image.map((img, i) => <SwiperSlide key={i} className='history-img'>
                                <img src={img} alt="" />
                                <div className='swipe-page-text'>
                                    <h3>user: {x.username}</h3>
                                </div>
                            </SwiperSlide>)}
                        </Swiper>
                        </section>)}
                
            </main>
            
        </section>
    )
}

export default HistoryPage
