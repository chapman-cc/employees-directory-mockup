window.addEventListener("DOMContentLoaded", () => {

    const directory = document.getElementById('directory');
    const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca";

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            createEmployeeCard(data.results);
        }
    };
    xhr.onerror = function () {
        alert("Request Failed")
    };
    xhr.open("GET", randomUserAPI, true);
    xhr.send();
})


/**
 * 
 * @param {array} employees is array pass from AJAX
 */
const createEmployeeCard = employees => {
    employees.forEach(employee => {

        let employeeTel = createHTMLNode(employee.cell, "p", "card__employeeDetails");

        let location = employee.location.street + ", " + employee.location.city + ", " + employee.location.postcode;
        let employeeLocation = createHTMLNode(location, "p", "card__employeeDetails");
        let dob = employee.dob.date.slice(0, 10);
        let employeeBday = createHTMLNode(dob, 'p', "card__employeeDetails");
        let cardSeperator = createHTMLNode(null, 'div', "card__seperator");

        let fullName = employee.name.first + " " + employee.name.last;
        let employeeEmail = createHTMLNode(employee.email, "p", "card__employeeEmail");
        let employeeCity = createHTMLNode(employee.location.city, 'p', "card__employeeDetails");
        let employeeName = createHTMLNode(fullName, 'h2', "card__employeeName");

        let cardProfile = createHTMLNode(null, "div", "card__profile");

        appendMultipleChild(cardProfile, employeeName, employeeEmail, employeeCity, cardSeperator, employeeTel, employeeLocation, employeeBday);

        let img = createHTMLNode(null, 'img', "card__avatar");
        img.src = employee.picture.large;
        img.alt = fullName;

        let card = createHTMLNode(null, 'a', "card");
        appendMultipleChild(card, img, cardProfile);

        directory.appendChild(card);
    });
};

/**
 * Create a HTML DOM Node 
 * 
 * @param {*} innerText texts set inside the HTML node
 * @param {string} element tag set inside the HTML node
 * @param  {...string} classNames a set of classes, can be multiple 
 */
function createHTMLNode(innerText, element, ...classNames) {
    let node = document.createElement(element);
    classNames.forEach(className => node.classList.add(className))
    node.innerText = innerText;
    return node;
}
/**
 * To append multiple children to a parent DOM node, in order from top to bottom
 * 
 * @param {DOM} parent is the parent element to append from
 * @param  {...DOM} children are childs that append to children 
 */
function appendMultipleChild(parent, ...children) {
    children.forEach(child => parent.appendChild(child))
};