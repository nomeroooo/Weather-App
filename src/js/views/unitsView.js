import { View } from './View.js';
import fahrenheit from 'url:../../img/fahrenheit.svg';
import celsius from 'url:../../img/celsius.svg';

class UnitsView extends View {
  _parentEl = document.querySelector('.header__buttons');

  addHandlerChangeUnits(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const selected = e.target.closest('.header__button');
      if (!selected) return;

      const unit = selected.dataset.unit;
      handler(unit);
    });
  }

  changeUnits(unit) {
    if (unit === 'Celsius') {
      this._parentEl
        .querySelector('.header__button[data-unit="Celsius"]')
        .classList.add('header__button--active');
      this._parentEl
        .querySelector('.header__button[data-unit="Fahrenheit"]')
        .classList.remove('header__button--active');
    }

    if (unit === 'Fahrenheit') {
      this._parentEl
        .querySelector('.header__button[data-unit="Fahrenheit"]')
        .classList.add('header__button--active');
      this._parentEl
        .querySelector('.header__button[data-unit="Celsius"]')
        .classList.remove('header__button--active');
    }
  }
}

export default new UnitsView();
