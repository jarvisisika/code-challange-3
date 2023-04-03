//Get elements from the DOM
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTickets = document.getElementById("available-tickets");
const buyTicketButton = document.getElementById("buy-ticket");
const filmsList = document.getElementById("films");

// Function to render movie details
function renderMovieDetails(movie) {
poster.src = movie.poster;
title.textContent = movie.title;
runtime.textContent = movie.runtime;
showtime.textContent = movie.showtime;

// Calculate available tickets by subtracting tickets sold from capacity
const available = movie.capacity - movie.tickets_sold;
availableTickets.textContent = available;
}
// Function to render films list
function renderFilmsList(films) {
// Remove placeholder element from films list
filmsList.innerHTML = "";

films.forEach(function (film) {
    const li = document.createElement("li");
    li.classList.add("film", "item");
    li.textContent = film.title;
    li.addEventListener("click", function () {
      renderMovieDetails(film);
    });
    filmsList.appendChild(li);
  });
}

// Make GET request to retrieve films data
fetch("http://localhost:3000/films")
.then((response) => response.json())
.then((data) => {
  renderFilmsList(data);
  // Load details for first film in list
  renderMovieDetails(data[0]);
})
.catch((error) => console.error(error));
// Event listener for buy ticket button
buyTicketButton.addEventListener("click", function () {
const available = parseInt(availableTickets.textContent);
if (available > 0) {
availableTickets.textContent = available - 1;
alert("Ticket purchased successfully!");
} else {
alert("Sorry, this showing is sold out!");
}
});
