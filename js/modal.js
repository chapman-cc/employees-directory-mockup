directory.addEventListener('click', evt => {
    let card = evt.target.closest("div.card"); // select the nearest "div.card" element 
    let cardIndex = card.dataset.in;
    let modalHTML = createCard(employeesDirectory[cardIndex], "large");
    modal.appendChild(modalHTML);  
    modal.classList.toggle('card--hidden')

}, false)

modal.addEventListener('click', evt => {
    if (evt.target === modal) {
        modal.innerHTML = null;
        toggleMultiClasses("card--hidden", modal);
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}