function searchByLetter(letter) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            fetch('http://localhost:8080/fav')
                .then(response => response.json())
                .then(localData => {
                    console.log(localData);
                    displayCards(data.meals, localData);
                    console.log(data.meals);
                })
                .catch(error => console.error('Error fetching local data:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayCards(meals) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (meals.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'Aucun résultat';
        cardContainer.appendChild(noResultMessage);
    } else {
        meals.forEach(meal => {
            const card = document.createElement('div');
            card.classList.add('card');

            const name = document.createElement('h5');
            name.textContent = meal.strMeal;

            const image = document.createElement('img');
            image.src = meal.strMealThumb;
            image.alt = meal.strMeal;

            const favButton = document.createElement('button');
            favButton.textContent = 'Ajouter aux favoris 🥴';
            favButton.classList.add('fav-button');

            card.appendChild(name);
            card.appendChild(image);
            cardContainer.appendChild(card);
            card.appendChild(favButton);
        });
    }
}


function addToFavorites(meal) {
    fetch('http://localhost:8080/fav/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: meal.strMeal })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const popup = document.getElementById('popup');
            popup.textContent = 'Recette ajoutée aux favoris 🤨';
            popup.classList.add('success');
            popup.style.display = 'block';
            setTimeout(() => {
                popup.textContent = '';
                popup.classList.remove('success');
                popup.style.display = 'none';
            }, 3000);
            searchByLetter('');
        })
        .catch(error => console.error('Error adding to favorites:', error));
}

const footer = document.querySelector('.footer');
const footerHeight = footer.offsetHeight;
const cardContainer = document.getElementById('card-container');
cardContainer.style.marginBottom = `${footerHeight}px`;

function displayCards(meals) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('card');

        const name = document.createElement('h5');
        name.textContent = meal.strMeal;


        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;

        const favButton = document.createElement('button');
        favButton.textContent = 'Ajouter aux favoris';
        favButton.classList.add('fav-button');
        favButton.addEventListener('click', () => {
            addToFavorites(meal);
        });

        image.addEventListener('click', () => {
            showRecipeDetails(meal);
        });

        card.appendChild(name);
        card.appendChild(image);
        cardContainer.appendChild(card);
        card.appendChild(favButton);
    });
}

const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.trim();

    if (searchTerm === '') {
        searchByLetter('');
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayCards(data.meals);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

function showRecipeDetails(meal) {
    window.location.href = `recipe.html?mealId=${meal.idMeal}`;
}
