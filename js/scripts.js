/* scripts.js */

const gallery = document.getElementById('gallery');

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(err => console.log('there was an error:', error));
}

fetchData('https://randomuser.me/api/?results=12')
.then(data => {
    // appendUsers(data.results);
    gatherUserData(data.results);
})

function checkStatus(res) {
    if (res.ok) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(new Error(res.statusText));
    }
}

function gatherUserData(results) {
    results.forEach(result => {
        console.log('dob', result.dob.date);
        const user = {
            name: `${result.name.first} ${result.name.last}`,
            email: result.email,
            location: `${result.location.city}, ${result.location.state}, ${result.location.country}`,
            image: {
                medium: result.picture.medium,
                large: result.picture.large
            },
            cell: result.cell,
           // birthday: `${result.dob.getMonth()} ${result.dob.getDay()}, ${result.dob.getFullYear()}`
        }
        console.log(user);
    });
}

function appendUsers(results) {
    results.forEach(result => {
        const name = `${result.name.first} ${result.name.last}`;
        const location = `${result.location.city}, ${result.location.state}, ${result.location.country}`;
        console.log(result);
        const userHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${result.picture.medium}" alt="${name} profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name}</h3>
                <p class="card-text">${result.email}</p>
                <p class="card-text cap">${location}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', userHTML); 
    })
}