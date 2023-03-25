import { View } from './View.js';
import { iconsHelper } from '../helper.js';
import thermometer from 'url:../../img/thermometer.svg';

class DailyView extends View {
  _parentEl = document.querySelector('.daily__entries');
  _errorMessage = 'Fetching daily data failed.';

  _generateMarkup() {
    return this._data
      .map(entry => {
        return `
        <div class="daily__entry">
          <span class="date">${new Date(entry.date).toLocaleDateString(
            'en-US',
            { day: '2-digit', month: 'long' }
          )}</span>
          <img src="${iconsHelper[entry.icon]}" alt="weaher icon" />
          <div class="daily__info">
            <img src="${thermometer}" alt="thermometer" />
            <span>${Math.round(
              this._unit === 'Celsius'
                ? entry.maxTemp
                : entry.maxTemp * 1.8 + 32
            )}<sup>o</sup> | ${Math.round(
          this._unit === 'Celsius' ? entry.minTemp : entry.minTemp * 1.8 + 32
        )}<sup>o</sup></span>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

export default new DailyView();
