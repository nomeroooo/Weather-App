import { View } from './View';

class HourlyPaginationView extends View {
  _parentEl = document.querySelector('.hourly .pagination');

  addHandlerSelectPage(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.pagination__button');
      if (!btn) return;

      handler(+btn.dataset.page);
    });
  }

  _generateMarkup() {
    return `
      <button class="pagination__button pagination__button--active" data-page="1"></button>
      <button class="pagination__button" data-page="2"></button>
      <button class="pagination__button" data-page="3"></button>
      <button class="pagination__button" data-page="4"></button>
      <button class="pagination__button" data-page="5"></button>
    `;
  }

  changeActiveButton(page) {
    this._parentEl.querySelectorAll('.pagination__button').forEach(button => {
      button.classList.remove('pagination__button--active');
      if (page === +button.dataset.page) {
        button.classList.add('pagination__button--active');
      }
    });
  }
}

export default new HourlyPaginationView();
