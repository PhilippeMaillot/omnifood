const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('mealId');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        document.getElementById('recipe-name').textContent = meal.strMeal;
        document.getElementById('recipe-image').src = meal.strMealThumb;
        document.getElementById('recipe-category').textContent = meal.strCategory;
        document.getElementById('recipe-instructions').textContent = meal.strInstructions;

        const ingredientsList = document.getElementById('recipe-ingredients');
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.textContent = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(listItem);
            }
        }
    })
    .catch(error => console.error('Error fetching recipe details:', error));
