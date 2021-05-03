//API variables//
const Meal_URL ='https://www.themealdb.com/api/json/v1/1/search.php'
const Area_URL ='https://www.themealdb.com/api/json/v1/1/filter.php' 
//Id variables for DOM//
const dropDown = document.getElementById('cuisine-dropdown')
const recpClick= document.getElementById('search-recipe')
const recipeName= document.getElementById('search-form-recipe')
const mealHolder= document.getElementById('meal-holder')
const recipeHolder= document.getElementById('recipe-holder')
const ingredientHolder= document.getElementById('ingredient-holder')
//Array of meals//
let MEAL_ARRAY = []

//fetch meals by name//
const fetchByName = () => { 
    event.preventDefault() 
    fetch(Meal_URL +`?s=${recipeName[0].value}`)
    .then ((res)=> res.json())
    .then((data) => {
        data.meals.forEach((recipe)=> {
          recipeListItem(recipe)
          MEAL_ARRAY.push(recipe) 
    })     
    })
}

//Fetch means by area//
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
//List searched for meals by name in HTML//
const recipeListItem  =(recipe) => {
    const newRecipe= document.createElement('li')
    newRecipe.innerText=recipe.strMeal
    // console.log(recipe)
    recipeHolder.appendChild(newRecipe)
    newRecipe.addEventListener('click', ingredientList )
}


//List dropdowm meals by area in HTML//
const mealList = (cuisines) => {
    const newMeal = document.createElement('li')
    newMeal.innerText=cuisines.strMeal
    mealHolder.appendChild(newMeal)
    newMeal.addEventListener('click', ingredientList)

}

//Loop threw Meal for ingredients and measurement//
const findMeal= mealTerm => {
    return MEAL_ARRAY.find(e => e.strMeal === mealTerm)
    }
const ingredientList =(e)=> {
    const mealTerm = e.target.innerText
    const theMeal = findMeal(mealTerm)
    if (!theMeal.ingredientArr) {
        let ingredientArr = [];
        for(let i=1; i<=20; ++i) {
        const ingredientString = theMeal[`strMeasure${i}`] +"  "+  theMeal[`strIngredient${i}`]
        ingredientArr.push(ingredientString)        
    }    
     theMeal['ingredientArr']=ingredientArr 
}
displayIngredients (theMeal)
}
    
//List theMeal on Html.  Use dom connect CSS to crossout list//
const displayIngredients = (theMeal, meal) => {
    let mealList= theMeal.ingredientArr.forEach(function(meal)  {
        console.log(meal)
        const newDisplay = document.createElement('li')
        const list = document.querySelector('#ingredient-holder')
        newDisplay.innerText = meal
        ingredientHolder.appendChild(newDisplay)
        list.addEventListener('click', function (e) {
            if (e.target) {
            e.target.classList.add('done')
  }
})

    })
}
//main eventListeners//

dropDown.addEventListener('click',fetchByCuisine)
recipeName.addEventListener('submit',fetchByName);

