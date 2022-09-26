import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import MainContext from '../context/mainContext';

function LikesAndDislikesPage() {
    const { filteredUsers,  setLikedUsers, user } = useContext(MainContext)
    const [index, setIndex] = useState(0)

    useEffect(() => {

    }, [filteredUsers])
    // console.log(filteredUsers);

    function handleLike() {
        const liked = {
            user: user.username,
            userImage: user.image,
            username: filteredUsers[index].username,
            image: filteredUsers[index].image
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(liked)
        }

        fetch("http://localhost:4000/uploadLikes", options)
            .then(res => res.json())
            .then(data => {
                setLikedUsers(data.data.likes)

                console.log(data)
            })
        setIndex(+1)
    }

    function handleDislike() {
        setIndex(+1)
    }

    // console.log(likedUsers);
    // console.log(likes);

    return (
        <div>
            <main className='profile-page'>
                <div className='likes-link'>
                  <Link to='/history' ><h3>View likes</h3></Link> 
                </div>
                <section className='swipe'>
                    <Swiper
                        modules={[Navigation, EffectFade]}
                        navigation
                        effect={'fade'}
                        speed={800}
                        slidesPerView={1}
                    >
                        {filteredUsers && filteredUsers[index].image.map((x, i) => <SwiperSlide key={i} className='swipers-slide'>
                            <img src={x} alt="" />
                            <div className='swipe-page-text'>
                                <h3>user: {filteredUsers[index].username}</h3>
                            </div>
                        </SwiperSlide>)}
                    </Swiper>

                </section>
                <div className='swipe-btns'>
                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                </div>

            </main>
        </div>
    )
}

export default LikesAndDislikesPage
