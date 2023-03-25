import { async } from 'regenerator-runtime';
import { API_KEY, SEC_TO_MILLISEC } from './config.js';
import { getJSON } from './helper.js';
import { MANILA, BERLIN, SEOUL, BOSTON, PARIS, LONDON } from './config.js';

export const state = {
  location: {},
  current: {},
  hourly: { page: 1, entries: [] },
  daily: { page: 1, entries: [] },
  unit: 'Celsius',
  search: {
    query: '',
    results: [],
  },
  loadedDataAside: [
    { city: 'Manila', country: 'PH', coords: MANILA },
    { city: 'Seoul', country: 'KR', coords: SEOUL },
    { city: 'Berlin', country: 'DE', coords: BERLIN },
    { city: 'Boston', country: 'US', coords: BOSTON },
    { city: 'Paris', country: 'FR', coords: PARIS },
    { city: 'London', country: 'GB', coords: LONDON },
  ],
};

const initialCoords = {};

// Get  user's coordinates
export const getInitialCoords = async function () {
  try {
    if (navigator.geolocation) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
          position => {
            initialCoords.lat = position.coords.latitude;
            initialCoords.lon = position.coords.longitude;
            resolve();
          },
          err => reject(err)
        );
      });
    }
  } catch (err) {
    throw err;
  }
};

// Get the users city name using reverse geolocation
export const getLocation = async function (info = initialCoords) {
  // reverse geolocation is only used in the beginning to set the state.locaton
  try {
    if (info === initialCoords) {
      const data = await getJSON(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${info.lat}&lon=${info.lon}&appid=${API_KEY}`
      );
      console.log(data);
      state.location.city = data[0].name;
      state.location.country = data[0].country;
      return;
    }
    // state.location is set based on the data from DOM
    state.location.city = info.city;
    state.location.country = info.country;
  } catch (err) {
    throw err;
  }
};

export const loadWeather = async function (info = initialCoords) {
  // Load weather data using openweathermap API
  try {
    const data = await getJSON(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${info.lat}&lon=${info.lon}&exclude=minutely&units=metric&appid=${API_KEY}`
    );

    // Set state.current
    state.current = {
      temp: data.current.temp,
      sunrise: data.current.sunrise * SEC_TO_MILLISEC,
      sunset: data.current.sunset * SEC_TO_MILLISEC,
      humidity: data.current.humidity,
      uvi: data.current.uvi,
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
    };

    state.location.date = data.current.dt * SEC_TO_MILLISEC;

    // Resetting the page to 1 every new query
    state.hourly.page = 1;
    state.daily.page = 1;

    // Resetting the results every new query
    state.hourly.entries = [];
    state.daily.entries = [];

    // Getting data only the from first 25 hourly data from data from API
    for (let i = 0; i < 25; i++) {
      state.hourly.entries.push({
        temp: data.hourly[i].temp,
        rain: data.hourly[i].pop,
        time: data.hourly[i].dt * SEC_TO_MILLISEC,
      });
    }

    // Getting data from all daily data from data from API
    for (let entry of data.daily) {
      state.daily.entries.push({
        minTemp: entry.temp.min,
        maxTemp: entry.temp.max,
        icon: entry.weather[0].icon,
        date: entry.dt * SEC_TO_MILLISEC,
      });
    }
  } catch (err) {
    throw err;
  }
};

export const getFiveHourlyEntries = function (page = state.hourly.page) {
  state.hourly.page = page;

  const start = (page - 1) * 5;
  const end = page * 5;

  return state.hourly.entries.slice(start, end);
};

export const getFourDailyEntries = function (page = state.daily.page) {
  state.daily.page = page;

  const start = (page - 1) * 4;
  const end = page * 4;

  return state.daily.entries.slice(start, end);
};

export const loadSearchResults = async function (query) {
  try {
    //removing the word 'city' and whitespaces if ever the user types the city name with 'city', the api only uses the exact city name for some cities
    const newQuery = query
      .trim()
      .split(' ')
      .map(word => (word.toLowerCase() === 'city' ? '' : word))
      .join(' ');
    state.search.query = newQuery;
    // console.log(newQuery);
    const data = await getJSON(
      `http://api.openweathermap.org/geo/1.0/direct?q=${newQuery}&limit=5&appid=${API_KEY}`
    );

    console.log(data);
    if (data.length === 0) throw new Error();
    state.search.results = data.map(result => {
      return {
        city: result.name,
        state: result.state,
        country: result.country,
        lat: result.lat,
        lon: result.lon,
      };
    });
    // console.log(data);
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

export const changeUnits = function (unit) {
  state.unit = unit;
};

export const loadWeatherAside = async function () {
  try {
    const data = await Promise.all(
      state.loadedDataAside.map(city =>
        getJSON(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&exclude=minutely&units=metric&appid=${API_KEY}`
        )
      )
    );

    data.forEach((response, i) => {
      state.loadedDataAside[i].temp = response.main.temp;
      state.loadedDataAside[i].description = response.weather[0].description;
      // console.log(state.loadedDataAside[i]);
    });
    console.log(state.loadedDataAside);
    // console.log(data);
  } catch (err) {
    throw err;
  }
};
