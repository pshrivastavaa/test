import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ history }) => {

    const [details, setDetails] = useState([])
    const [weather, setWeather] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('countryDetail')) {
            setDetails(JSON.parse(localStorage.getItem('countryDetail')))
        } else {
            history.push('/')
        }
    }, [history])

    const getWeather = async (capital) => {
        setLoading(true)
        await axios.get(`http://api.weatherstack.com/current?access_key=fa56a49804f341392232a2ec5d99e4e2&query=${capital}`)
            .then((res) => {
                setLoading(false)
                setWeather(res.data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
            })
    }

    return (
        <div>
            <div>
                <h4>Country information</h4>
            </div>
            <div className='row'>
                {details.map(data => (
                    <div className='card col-md-4 p-3 text-center' key={data.area}>
                        <span>Capital: {data.capital || 'No capital provided'}</span>
                        <span>Population: {data.population}</span>
                        <span>Latitude: {data.latlng[0]} </span>
                        <span>Longitude: {data.latlng[1]} </span>
                        <span> <img src={data.flag} alt='flag' width='40px' /></span>
                        <div className='mt-2 text-center'>
                            <button className='btn btn-primary btn-sm' data-toggle="modal" data-target="#exampleModal" onClick={() => getWeather(data.capital)}>Capital Weather</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Weather Detail</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            {loading ? <div>Loading...</div> :
                                <div>
                                    <h3>{weather?.request?.query}</h3>
                                    <h4>{weather?.current?.temperature}°C</h4>
                                    <img src={weather?.current?.weather_icons ? weather?.current?.weather_icons[0] : null} alt='weather' width='50px' />
                                    <p className='mt-4'>Wind Speed: {weather?.current?.wind_speed}</p>
                                    <p>Precip: {weather?.current?.precip}</p>
                                </div>}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetail
