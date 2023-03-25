import humidity from 'url:../../img/humidity.svg';
import sunrise from 'url:../../img/sunrise.svg';
import sunset from 'url:../../img/sunset.svg';
import uvi from 'url:../../img/uv-index.svg';
import { iconsHelper } from '../helper.js';
import { View } from './View.js';

class MainView extends View {
  _parentEl = document.querySelector('.main__container');
  _errorMessage =
    "Fetching current data failed. Either there was a problem getting your location's coordinates or fetching the weather data. Try to search another city name.";

  _generateMarkup() {
    return `
    <h2 class="main__heading">Today's Weather</h2>
    <div class="main__img" style="background-image: url(${
      iconsHelper[this._data.icon]
    })"></div>
    <span class="main__temperature"
      >${Math.round(
        this._unit === 'Celsius' ? this._data.temp : this._data.temp * 1.8 + 32
      )}<sup>o</sup></span
    >
    <p class="main__description">${this._data.description
      .split(' ')
      .map(word => word.replace(word[0], word[0].toUpperCase()))
      .join(' ')}</p>
    <div class="main__details">
      <div class="main__detail">
        <img src="${sunrise}" alt="sunrise icon" />
        <p>Sunrise</p>
        <time datetime="5:45">${new Date(this._data.sunrise).toLocaleTimeString(
          'en-PH',
          { hour: '2-digit', minute: '2-digit' }
        )}</time>
      </div>
      <div class="main__detail">
        <img src="${sunset}" alt="sunset icon" />
        <p>Sunset</p>
        <time datetime="5:45">${new Date(this._data.sunset).toLocaleTimeString(
          'en-PH',
          { hour: '2-digit', minute: '2-digit' }
        )}</time>
      </div>
      <div class="main__detail">
        <img src="${humidity}" alt="humidty icon" />
        <p>Humidity</p>
        <span>${this._data.humidity}%</span>
      </div>
      <div class="main__detail">
        <img src="${uvi}" alt="uv index icon" />
        <p>UV Index</p>
        <span>${this._data.uvi}</span>
      </div>
    </div>
  `;
  }
}

export default new MainView();
