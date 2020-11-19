import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InputForm = ({ history }) => {

    const [countryName, setCountryName] = useState('')
    useEffect(() => {
        if (localStorage.getItem('countryDetail')) localStorage.removeItem('countryDetail')
    }, [])

    const submitHandler = async () => {
        await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
            .then((res) => {
                localStorage.setItem('countryDetail', JSON.stringify(res.data))
                history.push('/detail')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <form>
                <div className='form-group'>
                    <div>Country Name</div>
                    <input className='form-control' value={countryName} onChange={(e) => setCountryName(e.target.value)} />
                </div>
                <button type='button' className='btn btn-primary' disabled={!countryName.trim()} onClick={submitHandler}>Submit</button>
            </form>

        </div>
    )
}

export default InputForm
