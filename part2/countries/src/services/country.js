import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const api = baseUrl + "/all"
  const request =  axios.get(api)
  return request.then(response => response.data)
}

const getByName = name => {
    const api = baseUrl + "/name/" + name 
    const request =  axios.get(api)
    return request.then(response => response.data)
}

const getWeather = (region) => {
    const api = weatherBaseUrl + `q=${region}&appid=${api_key}`
    const request =  axios.get(api)
    return request.then(response => response.data)
}

export default {
    getAll: getAll, 
    getByName: getByName,
    getWeather: getWeather,
}