
const Meal_URL ='https://www.themealdb.com/api/json/v1/1/search.php'
const Area_URL ='https://www.themealdb.com/api/json/v1/1/filter.php' 
const dropDown = document.getElementById('cuisine-dropdown')
const recpClick= document.getElementById('search-recipe')
const recipeName= document.getElementById('search-form-recipe')
const mealHolder= document.getElementById('meal-holder')
const recipeHolder= document.getElementById('recipe-holder')
const ingredientHolder= document.getElementById('ingredient-holder')
let MEAL_ARRAY = []

const fetchByName = () => { 
    // debugger
    event.preventDefault()
    resetPage()
    fetch(Meal_URL +`?s=${recipeName[0].value}`)
    .then ((res)=> res.json())
    .then((data) => {
        // debugger
        data.meals.forEach((recipe)=> {
          recipeListItem(recipe)
          MEAL_ARRAY.push(recipe) 
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

const recipeListItem  =(recipe) => {
    // resetPage()
    const newRecipe= document.createElement('li')
    newRecipe.innerText=recipe.strMeal
    // console.log(recipe)
    recipeHolder.appendChild(newRecipe)
    newRecipe.addEventListener('click', ingredientList )
}



const mealList = (cuisines) => {
    const newMeal = document.createElement('li')
    newMeal.innerText=cuisines.strMeal
    mealHolder.appendChild(newMeal)
    newMeal.addEventListener('click', ingredientList)

}

const findMeal= mealTerm => {
    return MEAL_ARRAY.find(e => e.strMeal === mealTerm)
    }
const ingredientList =(e)=> {
    const mealTerm = e.target.innerText
   
    const theMeal = findMeal(mealTerm)
    
    if (!theMeal.ingredientArr) {
        let ingredientArr = [];
        for(let i=1; i<=20; ++i) {
        const ingredientString = theMeal[`strMeasure${i}`] +" "+  theMeal[`strIngredient${i}`]
        ingredientArr.push(ingredientString)        
    }    
      
     theMeal['ingredientArr']=ingredientArr 
}
displayIngredients(theMeal)

}
  
const displayIngredients = (theMeal) => {
    const {quanity, ingredient} = theMeal
    const newDisplay = document.createElement('hi')
    newDisplay.innerText = theMeal.ingredientArr
    ingredientHolder.appendChild(newDisplay)
    console.log(newDisplay)
}

const resetPage = () => {
   recipeHolder.innerText= "" 
} 

dropDown.addEventListener('click',fetchByCuisine)
recipeName.addEventListener('submit',fetchByName)

