function fetchFavoritesAndDisplayCards() {
    fetch('http://localhost:8080/fav')
        .then(response => response.json())
        .then(data => {
            const columnNames = Object.keys(data);
            columnNames.forEach(columnName => {
                const mealName = data[columnName].name;
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
                    .then(response => response.json())
                    .then(mealData => {
                        displayCards(mealData.meals);
                    })
                    .catch(error => console.error('Error fetching meal data:', error));
            });
        })
        .catch(error => console.error('Error fetching favorites:', error));
}

function displayCards(meals) {
    const cardContainer = document.getElementById('card-container');

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('card');

        const id = document.createElement('p');
        id.textContent = meal.idMeal;
        id.style.display = 'none';
        card.appendChild(id);

        const name = document.createElement('h5');
        name.textContent = meal.strMeal;

        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer des favoris';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteFavorites(meal);
        });

        card.appendChild(name);
        card.appendChild(image);
        cardContainer.appendChild(card);
        card.appendChild(deleteButton);
    });
}

function deleteFavorites(meal) {
    fetch(`http://localhost:8080/fav/delete/${meal.strMeal}`, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error deleting favorites:', error));
        window.location.reload();
}

fetchFavoritesAndDisplayCards();
