import React, { useContext, useEffect, useRef, useState } from 'react'
import MainContext from '../context/mainContext'
import InputRange from 'react-input-range'
import style from 'react-input-range/lib/css/index.css'
import { useNavigate } from 'react-router-dom'

function FilterPage() {
    const { setAllUsers, setFilteredUsers } = useContext(MainContext)
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedGender, setSelectedGender] = useState(null)
    const [selectedYear, setSelectedYear] = useState(0)
    const nav = useNavigate()

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify()
        }

        fetch('http://localhost:4000/allUsers', options)
            .then(res => res.json())
            .then(data => {
                setAllUsers(data.data.allUsers)
                // console.log(data.data.allUsers)
            })
    }, [])

    function handleCity(e) {
        setSelectedCity(e.target.value)
    }
    // console.log(selectedCity);

    function handleGender(e) {
        setSelectedGender(e.currentTarget.textContent)
        // console.log(e.currentTarget.textContent);
    }
    // console.log(selectedGender);

    function handleYears(e) {
        setSelectedYear(e)
    }
    // console.log(selectedYear);

    function handleFilter() {
        const filterUser = {
            city: selectedCity,
            gender: selectedGender,
            year: selectedYear
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(filterUser)
        }

        fetch("http://localhost:4000/filter", options)
            .then(res => res.json())
            .then(data => {
                setFilteredUsers(data.data.filtered)
                nav('/swipe')
                console.log(data)
            })
    }
    // console.log(allUsers);
    return (
        <section className='filter-page'>
            <select name="city" className='filter-select-city' onChange={handleCity}>
                {/* {allUsers && allUsers.map((city, i) => <option key={i} value={city.city}>{city.city}</option>)} */}
                {/* {allUsers && [...new Set(allUsers.map(item => <option value={item.city}>{item.city}</option>))]} */}
                <option value='Vilnius'>Vilnius</option>
                <option value='Kaunas'>Kaunas</option>
                <option value='Alytus'>Alytus</option>
                <option value='Jonava'>Jonava</option>
            </select>
            <span>Select city</span>
            <div className='filter-gender-btns'>
                <button onClick={handleGender}>Woman</button>
                <button onClick={handleGender}>Man</button>
            </div>
            <span>Select gender</span>

            <div className="slidecontainer">
                {/* <input type="range" min='18' max="50" className='slider' /> */}
                <InputRange minValue={18} maxValue={50} value={selectedYear} onChange={e => handleYears(e)} >
                </InputRange>

                {/* <div className='year-range'>
                    <span>18</span>
                    <span>50</span>
                </div> */}

            </div>
            <span>Select years</span>
            <div className='filt-btn'>
                <button onClick={handleFilter}>Save filter</button>
            </div>

        </section>
    )
}

export default FilterPage
