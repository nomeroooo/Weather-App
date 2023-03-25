import * as model from './model.js';
import mainView from './views/mainView.js';
import hourlyView from './views/hourlyView.js';
import dailyView from './views/dailyView.js';
import locationView from './views/locationView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import unitsView from './views/unitsView.js';
import asideView from './views/asideView.js';
import hourlyPaginationView from './views/hourlyPaginationView.js';
import dailyPaginationView from './views/dailyPaginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlInitialState = async function () {
  try {
    // 1. Render spinners while waiting for data
    controlSpinners();

    // 2. Get user's location (coordinates)
    try {
      await model.getInitialCoords();
    } catch (err) {
      console.log(err);
    }
    // 3. Get user's location (exact name)
    try {
      await model.getLocation();
    } catch (err) {
      console.log(err);
    }
    // 4. Get the weather details from the API
    try {
      await model.loadWeather();
    } catch (err) {
      console.log(err);
    }
    // 5. Get weather details for other cities
    try {
      await model.loadWeatherAside();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

// This is for rendering all inital values for the UI, and will be reused for suceeding renders despite the name 'initial'
const controlInitialUI = function () {
  mainView.render(model.state.current, model.state.unit);
  hourlyView.render(model.getFiveHourlyEntries(), model.state.unit);
  dailyView.render(model.getFourDailyEntries(), model.state.unit);
  locationView.render(model.state.location);
  hourlyPaginationView.render(model.state.hourly.page);
  dailyPaginationView.render(model.state.daily.page);
  asideView.render(model.state, model.state.unit);
};

const controlSearchResults = async function () {
  try {
    // 1. Render spinner while waiting for data
    resultsView.renderSpinner();

    // 2. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 3. Load results
    await model.loadSearchResults(query);

    // 4. render the results
    resultsView.render(model.state.search.results);
  } catch (err) {
    mainView.renderError('No city found for your query.');
  }
};

const controlUIFromResults = async function (data) {
  try {
    // 1. Render spinner while waiting for data
    controlSpinners();

    // 2. Load data
    await model.getLocation(data);
    await model.loadWeather(data);

    // 3. Update UI
    controlInitialUI();
    // console.log(model.state);
  } catch (err) {
    console.log(err);
  }
};

const controlUIFromAside = async function (data) {
  try {
    // Guard clause to prevent rerender if the user clicks the active city
    if (model.state.location.city === data.city) return;

    // 1. Renser spinners while waiting for data
    controlSpinners();

    // 2. Load data
    await model.getLocation(data);
    await model.loadWeather(data);

    // 3. Update UI
    controlInitialUI();
  } catch (err) {
    console.log(err);
  }
};

const controlUnits = function (unit) {
  // Guard clause to prevent rerender if the user clicks the active unit
  if (unit === model.state.unit) return;
  // 1. Change unit in state
  model.changeUnits(unit);
  // 2. CHange active unit
  unitsView.changeUnits(unit);

  // 3. Update UI
  mainView.render(model.state.current, model.state.unit);
  hourlyView.render(model.getFiveHourlyEntries(), model.state.unit);
  dailyView.render(model.getFourDailyEntries(), model.state.unit);
  asideView.render(model.state, model.state.unit);
};

const controlHourlyPagination = function (page) {
  // Guard clause to prevent rerender if the user clicks the active page
  if (page === model.state.hourly.page) return;

  hourlyView.render(model.getFiveHourlyEntries(page));

  // Change active button
  hourlyPaginationView.changeActiveButton(page);
};

const controlDailyPagination = function (page) {
  // Guard clause to prevent rerender if the user clicks the active page
  if (page === model.state.daily.page) return;

  dailyView.render(model.getFourDailyEntries(page));

  //Change active button
  dailyPaginationView.changeActiveButton(page);
};

// function to render spinner and clear the pagination
const controlSpinners = function () {
  mainView.renderSpinner();
  hourlyView.renderSpinner();
  dailyView.renderSpinner();
  hourlyPaginationView.clear();
  dailyPaginationView.clear();
};

const initLocation = async function () {
  try {
    await controlInitialState();
  } catch (err) {
  } finally {
    init();
    controlInitialUI();
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerSelectResult(controlUIFromResults);
  unitsView.addHandlerChangeUnits(controlUnits);
  hourlyPaginationView.addHandlerSelectPage(controlHourlyPagination);
  dailyPaginationView.addHandlerSelectPage(controlDailyPagination);
  asideView.addHandlerSelectAside(controlUIFromAside);
};

initLocation();
