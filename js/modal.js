directory.addEventListener('click', evt => {
    let card = evt.target.closest("div.card"); // select the nearest "div.card" element 
    let cardIndex = parseInt(card.dataset.in);
    let modalHTML = createCard(employeesDirectory[cardIndex], "large");
    modalHTML.dataset.in = cardIndex;
    modal.appendChild(modalHTML);  
    modal.classList.toggle('card--hidden')
    
}, false)

modal.addEventListener('click', evt => {
    if (evt.target === modal) {
        modal.removeChild(modal.children[2]);
        modal.classList.toggle("card--hidden")
    } else if (evt.target.tagName === "IMG") {
        let bool = parseInt(evt.target.dataset.bool);
        
        let card = modal.querySelector("div.card");
        let cardIndex = parseInt(card.dataset.in);

        let cardNewIndex = bool? cardIndex + 1 : cardIndex -1; 
        
        let modalHTML = createCard(employeesDirectory[cardNewIndex], "large");
        modalHTML.dataset.in = cardNewIndex;
        modal.removeChild(modal.children[2]);
        modal.appendChild(modalHTML);  
        
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}