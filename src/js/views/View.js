import icons from 'url:../../img/icons.svg';

export class View {
  _data;
  _unit;

  render(data, unit) {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (Object.prototype.toString.call(data) === '[object Object]' &&
        Object.keys(data).length === 0)
      // Object.keys(data.loadedDataAside[0]).length === 3
    )
      return this.renderError();

    this._data = data;
    this._unit = unit;
    const html = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  clear() {
    this._parentEl.innerHTML = '';
  }

  renderNothing() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>  
  `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <p>${message}</p>
    </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
