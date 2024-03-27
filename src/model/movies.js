import Observer from "../utils/observer.js";


export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(films) {
    this._movies = films.slice();
  }

  getMovies() {
    return this._movies.slice();
  }

  updateMovie(updateType, updatedFilm) {
    const index = this._movies.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [...this._movies.slice(0, index), updatedFilm, ...this._movies.slice(index + 1)];
    this._notify(updateType, updatedFilm);
  }

  addComment(updateType, comment, filmID) {
    const updatedFilm = this._movies.find((film) => film.id === filmID);

    if (updatedFilm === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    updatedFilm.comments.push(comment);
    this._notify(updateType, updatedFilm);
  }

  deleteComment(updateType, deletedComment, filmID) {
    const updatedFilm = this._movies.find((film) => film.id === filmID);

    if (updatedFilm === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    updatedFilm.comments = updatedFilm.comments.filter((comment) => comment.id !== deletedComment.id).slice();
    this._notify(updateType, updatedFilm);
  }
}
