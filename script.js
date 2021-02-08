document.getElementById('button').addEventListener('click', ()=>{
    const primaryDiv = document.getElementById('mainContainer');
    const details = document.getElementById('details');
    primaryDiv.removeChild(details);
    const createDetailsDiv = document.createElement('div');
    createDetailsDiv.id = "details";
    primaryDiv.appendChild(createDetailsDiv);
    const foodDiv = document.getElementById('food');
    primaryDiv.removeChild(foodDiv);
    const createDiv = document.createElement('div');
    createDiv.id = "food";
    primaryDiv.appendChild(createDiv);
    
    const name = document.getElementById('search').value;
    if(name.length == 1){
        // console.log("true");
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
    }   
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    }
    // console.log(name.length);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;     
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))      
    
})
const displayData = data => {
     const mainData = data.meals;
     if(!mainData){
        const foodDiv = document.getElementById('food');
        const noData = document.createElement('h3');
        noData.innerText = "Sorry, no food found";
        foodDiv.appendChild(noData);
     }
    //  console.log(mainData[1]);
     mainData.forEach(food => {
         const secondDiv = document.createElement('div');
         secondDiv.className = "secondDiv";
         const secondDivInfo = `
         <img onclick = "showDetails(${food.idMeal})" class = "foodImage" src = "${food.strMealThumb}"/>
         <div onclick = "showDetails(${food.idMeal})" class = "nameDiv">
         <h5 class = "foodName">${food.strMeal}</h5>
         </div>        
         `;
         secondDiv.innerHTML = secondDivInfo;
         const mainDiv = document.getElementById('food');
         mainDiv.appendChild(secondDiv);
        })    
}

const showDetails = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => fullDetails(data));
}

const fullDetails = oneFoodData => {
    // console.log(oneFoodData);
    const oneFoodAr = oneFoodData.meals;
    const oneFood = oneFoodAr[0];
    // console.log(oneFood[0]);
    const details = document.getElementById('details');
    details.innerHTML = `
        <div id = "dtls" class = "detailsDiv">
            <img class = "detailsFoodImage" src = "${oneFood.strMealThumb}"/>
            <h3 class = "detailsName">${oneFood.strMeal}</h3>
            <h6 class = "ingTitle">Ingredients</h6>
            <p class = "ings">1. ${oneFood.strIngredient1}</p>
            <p class = "ings">2. ${oneFood.strIngredient2}</p>
            <p class = "ings">3. ${oneFood.strIngredient3}</p>
            <p class = "ings">4. ${oneFood.strIngredient4}</p>
            <p class = "ings">5. ${oneFood.strIngredient5}</p>
        </div>
    `
}
