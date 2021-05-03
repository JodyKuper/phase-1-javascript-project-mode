
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
    // resetPage()
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
    // resetPage()
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
    // resetPage()
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
        const ingredientString = theMeal[`strMeasure${i}`] +"  "+  theMeal[`strIngredient${i}`]
        ingredientArr.push(ingredientString)        
    }    
      
     theMeal['ingredientArr']=ingredientArr 
}
displayIngredients (theMeal)
}
    
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


    
    // const newDisplay = document.createElement('li')
    // newDisplay.innerText = theMeal.ingredientArr
//     ingredientHolder.appendChild(newDisplay)
//     console.log(newDisplay)
// }

// const resetPage = () => {
//    recipeHolder.innerHTML= ""
//    recipeName.innerHTML= 
// //    dropDown.innerHTML=""
// //    recpClick.innerHTML=""
//    mealHolder.innerHTML=""
//    ingredientHolder.innerHTML=""
// } 

dropDown.addEventListener('click',fetchByCuisine)
recipeName.addEventListener('submit',fetchByName);

