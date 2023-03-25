import { View } from './View.js';
import thermometer from 'url:../../img/thermometer.svg';
import rain from 'url:../../img/rain.svg';

class HourlyView extends View {
  _parentEl = document.querySelector('.hourly__entries');
  _errorMessage = 'Fetching hourly data failed.';

  _generateMarkup() {
    return this._data
      .map(entry => {
        return `
        <div class="hourly__entry">
          <span class="time">${new Date(entry.time).toLocaleTimeString(
            'en-US',
            { hour: '2-digit' }
          )}</span>
          <div class="hourly__info">
            <img src="${thermometer}" alt="thermometer icon" />
            <span>${Math.round(
              this._unit === 'Celsius' ? entry.temp : entry.temp * 1.8 + 32
            )}<sup>o</sup></span>
          </div>
          <div class="hourly__info">
            <img src="${rain}" alt="rain icon" />
            <span>${entry.rain}%</span>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

export default new HourlyView();
