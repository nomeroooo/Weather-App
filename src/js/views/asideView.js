import { View } from './View.js';

class AsideView extends View {
  _parentEl = document.querySelector('.aside__entries');
  _errorMessage = 'Fetching other city data failed.';

  addHandlerSelectAside(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const selected = e.target.closest('.aside__entry');
      if (!selected) return;

      const dataSelected = {
        city: selected.dataset.city,
        country: selected.dataset.country,
        lat: selected.dataset.lat,
        lon: selected.dataset.lon,
      };
      handler(dataSelected);
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.loadedDataAside
      .map(city => {
        return `
      <div class="aside__entry ${
        this._data.location.city === city.city &&
        this._data.location.country === city.country
          ? 'aside__entry--active'
          : ''
      }" data-city="${city.city}" data-country="${city.country}" data-lat="${
          city.coords.lat
        }" data-lon="${city.coords.lon}">
        <span class="aside__city">${city.city}</span>
        <span class="aside__temp">${Math.round(
          this._unit === 'Celsius' ? city.temp : city.temp * 1.8 + 32
        )}<sup>o</sup></span>
        <span class="aside__description">${city.description
          .split(' ')
          .map(word => word.replace(word[0], word[0].toUpperCase()))
          .join(' ')}</span>
      </div>
      `;
      })
      .join('');
  }
}

export default new AsideView();
