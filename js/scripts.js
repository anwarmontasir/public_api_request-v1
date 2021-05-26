// DOM element for attaching gallery
const gallery = document.getElementById('gallery');
// store user info in array of objects
const userArray = [];

// function for fetching data
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(err => console.log('there was an error:', err));
}

// fetch random user data
fetchData('https://randomuser.me/api/?results=12')
.then(data => {
    // add data to array of objects
    gatherUserData(data.results);
    // append user images to DOM
    appendUsers(userArray);
})

// check if server response is ok
function checkStatus(res) {
    if (res.ok) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(new Error(res.statusText));
    }
}

// add data to array of objects
function gatherUserData(results) {
    results.forEach(result => {
        // date information. add preceding zero for single digit values 
        const birthDate = new Date(result.dob.date);
        const birthMonth = birthDate.getMonth() > 8 ? birthDate.getMonth() + 1 : `0${birthDate.getMonth() + 1}`;
        const birthDay = birthDate.getDate() > 8 ? birthDate.getDate() + 1 : `0${birthDate.getDate() + 1}`;
        const birthYear = birthDate.getFullYear();
        // city, state, country
        const userLocation = `${result.location.city}, ${result.location.state}, ${result.location.country}`
        // user object contains all necessary data
        const user = {
            name: `${result.name.first} ${result.name.last}`,
            email: result.email,
            image: {
                medium: result.picture.medium,
                large: result.picture.large
            },
            cell: result.cell,
            birthday: `${birthMonth}/${birthDay}/${birthYear}`,
            city: result.location.city,
            location: userLocation,
            address: `${result.location.street.number} ${result.location.street.name}, ${userLocation}, ${result.location.postcode}`
        }
        // add object to array
        userArray.push(user);
    });
}

// append users to DOM
function appendUsers(userArray) {
    userArray.forEach((user, i) => {
        const userHTML = `
        <div class="card card-${i}">
            <div class="card-img-container">
                <img class="card-img" src="${user.image.medium}" alt="${user.name} profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', userHTML);
        handleCardClick(i);
    })
}

// add click event
function handleCardClick(i) {
    document.querySelector(`.card-${i}`).addEventListener('click', () => {
       const modalHTML = `
       <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${userArray[i].image.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${userArray[i].name}</h3>
                    <p class="modal-text">${userArray[i].email}</p>
                    <p class="modal-text cap">${userArray[i].city}</p>
                    <hr>
                    <p class="modal-text">${userArray[i].cell}</p>
                    <p class="modal-text">${userArray[i].address}</p>
                    <p class="modal-text">Birthday: ${userArray[i].birthday}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
       `;
        document.querySelector('body').insertAdjacentHTML('beforeend', modalHTML);
        handleModalClick();
    })
}

function handleModalClick() {
    document.querySelector('.modal-container').addEventListener('click', evt => {
        if (evt.target.className === 'modal-container') {
            closeModal();
        };
    });
    document.querySelector('.modal-close-btn').addEventListener('click', () => {
        closeModal();
    })
}

function closeModal() {
    document.querySelector('.modal-container').remove();
}