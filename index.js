
const Meal_URL ='https://www.themealdb.com/api/json/v1/1/search.php'
const Area_URL ='https://www.themealdb.com/api/json/v1/1/filter.php' 
const dropDown = document.getElementById('cuisine-dropdown')
const recpClick= document.getElementById('search-recipe')
const recipeName= document.getElementById('search-form-recipe')
const mealHolder= document.getElementById('meal-holder')
const recipeHolder= document.getElementById('recipe-holder')
const ingredientHolder= document.getElementsByClassName('ingredient-holder')

const fetchByName = () => { 
    // debugger
    event.preventDefault()
    fetch(Meal_URL +`?s=${recipeName[0].value}`)
    .then ((res)=> res.json())
    .then((data) => {
        // debugger
        data.meals.forEach((recipe)=> {
          recipeList(recipe)  
    })     
    })
}

const fetchByCuisine =() => {
    event.preventDefault()
fetch(Area_URL +`?a=${dropDown.value}`)
.then ((res)=>res.json())
.then ((data)=> {
    data.meals.forEach((cuisines)=>{
    mealList(cuisines)
    
    })   
})
}

const recipeList =(recipe) => {
    const newRecipe= document.createElement('li')
    newRecipe.innerText=recipe.strMeal
    // console.log(recipe)
    recipeHolder.appendChild(newRecipe)
}



const mealList = (cuisines) => {
    const newMeal = document.createElement('li')
    newMeal.innerText=cuisines.strMeal
    mealHolder.appendChild(newMeal)

}

const ingredient =(recipe)=> {
    // debugger
    data.strIngredient1.forEach((recipe) => {
        ingredient(recipe)
    })
    const theIng = document.createElement(li)
    theIng.innerText=recipe.strIngredient1
    ingredientHolder.appendChild(theIng)

}


    

dropDown.addEventListener('click',fetchByCuisine)
recipeName.addEventListener('submit',fetchByName)
// fetchByName()
// fetchByCuisine()
// recipeList()
// mealList()
