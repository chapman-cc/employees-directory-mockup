const directory = document.getElementById('directory');

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const employees = data.results;
        employees.forEach(employee => {
            
            let employeeTel = createHTMLNode("p", employee.cell, "card__employeeDetails card--hidden");
            let location = employee.location.street + ", " + employee.location.city + ", " + employee.location.postcode;
            let employeeLocation = createHTMLNode("p", location, "card__employeeDetails card--hidden");
            let dob = employee.dob.date.slice(0, 10);
            let employeeBday = createHTMLNode('p', dob, "card__employeeDetails card--hidden");
            let cardSeperator = createHTMLNode('div', null , "card__seperator card--hidden");

            let fullName = employee.name.first + " " + employee.name.last;
            let employeeCity = createHTMLNode("p", employee.email, "card__employeeEmail");
            let employeeEmail = createHTMLNode('p', employee.location.city, "card__employeeDetails");
            let employeeName = createHTMLNode('h2', fullName, "card__employeeName");
                        
            let cardProfile = createHTMLNode("div", null, "card__profile");

            cardProfile.appendChild(employeeName); // *TODO: try to create a function to append multiple children
            cardProfile.appendChild(employeeEmail);
            cardProfile.appendChild(employeeCity);
            cardProfile.appendChild(cardSeperator);
            cardProfile.appendChild(employeeTel);
            cardProfile.appendChild(employeeLocation);
            cardProfile.appendChild(employeeBday);
            
            let img = createHTMLNode('img', null, "card__avatar");
            img.src = employee.picture.large;
            img.alt = fullName;

            let card = createHTMLNode('a', null, "card");
            card.appendChild(img);
            card.appendChild(cardProfile);

            directory.appendChild(card);
            

        })
        
        
        

    }
}
xhr.open("GET", "https://randomuser.me/api/?results=12&nat=us,nz,au,ca", true);
xhr.send();
// const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca";



function createHTMLNode (element, text, classNames) { //*TODO try use rest operator for classNames
    let node = document.createElement(element);
    node.className = classNames;
    node.innerText = text;
    return node;
}