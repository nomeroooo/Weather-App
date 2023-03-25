import { View } from './View.js';
import { countries } from 'countries-list';

class LocationView extends View {
  _parentEl = document.querySelector('.header__info');
  _errorMessage = 'Failed to get your city name';

  _generateMarkup() {
    return `
      <h1 class="header__place">${this._data.city}, ${
      countries[this._data.country].name
    } </h1>
      <p class="header__date">${new Date(this._data.date).toLocaleString(
        'en-US',
        { month: 'short', day: '2-digit', year: 'numeric', weekday: 'long' }
      )}</p>
    `;
  }
}

export default new LocationView();
