

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        employeeDir(data.results);
    }
};

xhr.open("GET", "https://randomuser.me/api/?results=12&nat=us,nz,au,ca", true);
xhr.send();
// const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca";

const employeeDir = employees => {
    const directory = document.getElementById('directory');
    employees.forEach(employee => {
                
        let employeeTel = createHTMLNode(employee.cell, "p", "card__employeeDetails", "card--hidden");
        // console.log(employeeTel);
        
        let location = employee.location.street + ", " + employee.location.city + ", " + employee.location.postcode;
        let employeeLocation = createHTMLNode(location, "p", "card__employeeDetails", "card--hidden");
        let dob = employee.dob.date.slice(0, 10);
        let employeeBday = createHTMLNode(dob, 'p', "card__employeeDetails", "card--hidden");
        let cardSeperator = createHTMLNode(null , 'div', "card__seperator", "card--hidden");

        let fullName = employee.name.first + " " + employee.name.last;
        let employeeCity = createHTMLNode(employee.email, "p", "card__employeeEmail");
        let employeeEmail = createHTMLNode(employee.location.city, 'p', "card__employeeDetails");
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

function createHTMLNode (innerText, element, ...classNames) { 
    let node = document.createElement(element);
    classNames.forEach(className => node.classList.add(className))
    node.innerText = innerText;
    return node;
}

function appendMultipleChild (parent, ...children) {
    children.forEach(child => parent.appendChild(child))
}

