import { View } from './View.js';
import { countries } from 'countries-list';

class ResultsView extends View {
  _parentEl = document.querySelector('.main__container');

  addHandlerSelectResult(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const selected = e.target.closest('.main__result');
      if (!selected) return;

      const dataSelected = {
        city: selected.dataset.city,
        country: selected.dataset.country,
        lat: selected.dataset.lat,
        lon: selected.dataset.lon,
      };
      console.log(dataSelected);
      handler(dataSelected);
    });
  }

  _generateMarkup() {
    return `
        <div class="main__results">
          ${this._data
            .map(result => {
              return `
              <div class="main__result" data-city="${
                result.city
              }" data-country="${result.country}" data-lat="${
                result.lat
              }" data-lon="${result.lon}">
                <p>${result.city}, ${
                result.state === undefined ? '' : result.state + ', '
              } ${countries[result.country].name}</p>
              </div>
            `;
            })
            .join('')}
        </div>
      `;
  }
}

export default new ResultsView();
