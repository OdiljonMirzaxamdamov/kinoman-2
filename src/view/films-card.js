import AbstractView from "./abstract.js";

const createFilmsCardTemplate = (filmCard) => {
  const {poster, releaseDate, title, rating, duration, description, genres, comments, isFavorite, isToWatchList, isWatched} = filmCard;

  const filmCardReleaseDate = releaseDate.toLocaleString(`en-GB`, {year: `numeric`});

  const watchListClass = isToWatchList ? `film-card__controls-item--active` : ``;
  const isWatchedClass = isWatched ? `film-card__controls-item--active` : ``;
  const isFavoriteClass = isFavorite ? `film-card__controls-item--active` : ``;

  const commentsCount = comments.length;

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmCardReleaseDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClass}">Mark as favorite</button>
      </form>
    </article>`;
};

export default class Film extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._FilmPopupClickHandler = this._FilmPopupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsCardTemplate(this._filmCard);
  }

  _FilmPopupClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      this._callback.filmPopupClick();
    }
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  setFilmPopupClickHandler(callback) {
    this._callback.filmPopupClick = callback;
    this.getElement().addEventListener(`click`, this._FilmPopupClickHandler);
  }
}
