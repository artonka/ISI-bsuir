'use strict';

// 1) Количество просмотренных фильмов
let numberOfFilms;

do {
    numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');
} while (numberOfFilms === null || numberOfFilms.trim() === '' || isNaN(numberOfFilms));

numberOfFilms = +numberOfFilms;

// 2) Объект personalMovieDB
const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

// 3–5) Два раза задаём вопросы с проверками
for (let i = 0; i < 2; i++) {
    let movieTitle;
    let movieRating;

    do {
        movieTitle = prompt('Один из последних просмотренных фильмов?', '');
    } while (
        movieTitle === null ||
        movieTitle.trim() === '' ||
        movieTitle.length > 50
    );

    do {
        movieRating = prompt('На сколько оцените его?', '');
    } while (
        movieRating === null ||
        movieRating.trim() === ''
    );

    personalMovieDB.movies[movieTitle] = movieRating;
}

// 6) Вывод в консоль
console.log(personalMovieDB);

// 7) Функция вывода movies в виде таблицы
function renderMoviesTable(movies) {
    const container = document.getElementById('moviesTable');

    const table = document.createElement('table');
    table.border = '1';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const thMovie = document.createElement('th');
    thMovie.textContent = 'Фильм';

    const thRating = document.createElement('th');
    thRating.textContent = 'Оценка';

    headerRow.appendChild(thMovie);
    headerRow.appendChild(thRating);
    thead.appendChild(headerRow);

    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (const movie in movies) {
        const row = document.createElement('tr');

        const tdMovie = document.createElement('td');
        tdMovie.textContent = movie;

        const tdRating = document.createElement('td');
        tdRating.textContent = movies[movie];

        row.appendChild(tdMovie);
        row.appendChild(tdRating);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

// Вызов функции
renderMoviesTable(personalMovieDB.movies);
