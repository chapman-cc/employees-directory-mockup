/**
 * * SEARCH BAR will capture values entered into #searchBar
 * * and filter .cards__name to match and hide by add class .card--hidden
 * * or remove the .card--hidden class to reveal cards
 */

searchBar.addEventListener('keyup', () =>{
    let value = searchBar.value.toLowerCase();
    let names = directory.querySelectorAll(".card__name");
    names.forEach(name => {
        if (name.innerHTML.indexOf(value) < 0) {
            let card = name.closest("div.card");
            card.classList.add("card--hidden");
        } else {
            let card = name.closest("div.card");
            card.classList.remove("card--hidden")
        }
    });
})