$(document).ready(() => {
    $("#directory").on('click', "a", toggleCardHidden);

})


function toggleCardHidden() {
    $(this).siblings("div").toggleClass("card--hidden"); /** TURN ON .card__shadow */
    $(this).toggleClass("card--selected"); /** TURN ON card--selected */
    $(this).children().children().toggleClass('card--hidden', false);
}