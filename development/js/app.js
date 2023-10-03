// przekierowanie na stronę główną z aplikacji
const appLogo = document.getElementById("app-logo");

appLogo.addEventListener('click', function () {
    window.location.href = "index.html";
})

// #2.3 Przechowywanie i dodawanie imienia

const userName = document.querySelector("#name");
const buttonName = document.querySelector(".button-secondary");
const userNameHeader = document.querySelector(".header__name");
const welcomeSection = document.querySelector(".welcome-form");
const logoutUser = document.querySelector(".header__logout");
const widgetSection = document.querySelector(".widget-all");
const weekPlanSection = document.querySelector(".schedule__container");
// const hideElement = (element) => element.classList.add("hide-element");
// const unhideElement = (element) => element.classList.remove("hide-element");

const hideElement = (element) => element.style.display = "none";
const unhideElement = (element) => element.style.display = "";

const savedName = localStorage.getItem("userName");
if (savedName) {
    userNameHeader.innerText = savedName;
    hideElement(welcomeSection);
    logoutUser.style.display = "inline";
    unhideElement(widgetSection);
    unhideElement(weekPlanSection);
} else {
    unhideElement(welcomeSection);
    logoutUser.style.display = "none";
    hideElement(widgetSection);
    hideElement(weekPlanSection);
}

const saveNameToLocalStorage = (event) => {
    event.preventDefault();
    localStorage.setItem("userName", userName.value);
    userNameHeader.innerText = userName.value;
    hideElement(welcomeSection);
    logoutUser.style.display = "inline";
    unhideElement(widgetSection);
    unhideElement(weekPlanSection);
};

const logoutClearLocalStorage = (event) => {
    event.preventDefault();
    localStorage.removeItem("userName");
    userNameHeader.innerText = "Imię";
    unhideElement(welcomeSection);
    logoutUser.style.display = "none";
    hideElement(widgetSection);
    hideElement(weekPlanSection);
}

buttonName.addEventListener("click", saveNameToLocalStorage);
logoutUser.addEventListener("click", logoutClearLocalStorage);

// ---- #2.3

// dodawanie przepisu i elementów przepisu
class Recipe {
    constructor(id, name, desc, instruction, ingredients) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.instruction = instruction; // tablica
        this.ingredients = ingredients;//tablica
    }

}

const recipeName = document.getElementById("recipe-name");
const recipeDesc = document.getElementById("recipe-desc");
const instructionDesc = document.getElementById("instruction-desc");
const ingredientsDesc = document.getElementById("ingredients-desc");
const recipeAddingBtn = document.getElementById("button-save");
const ingredientAddingBtn = document.getElementById("add-ingredient");
const instructionAddingBtn = document.getElementById("add-instruction");
const instructionList = document.getElementById("instruction-list");
const ingredients = document.getElementById("ingredients");
const ingredientsList = document.getElementById("ingredients-list");
//Na "clik" ma stworzyc nowy obiekt na podstawie konstruktora
// const firstReciep = new Recipe {
//     recipe.name = input.value...
// }
//
// Potem te elementy powinny być wrzucane do tabeli

const runAddInstruction = () => {
    if (instructionDesc.value) {
        let newInstruction = document.createElement("li");
        newInstruction.classList.add("instructions__list__item");
        newInstruction.innerHTML = `${instructionDesc.value}  <i class="fa-regular fa-pen-to-square clickable" data-unicode="f2ed"></i>
                        <i class="fa-regular fa-trash-can clickable" data-unicode="f044"></i>`
        instructionList.appendChild(newInstruction);
        instructionDesc.value = ""
        const delBtn = document.querySelector(".fa-trash-can");

        delBtn.addEventListener('click', function () {
            delBtn.parentElement.parentElement.removeChild(newInstruction);

        });
        const editBtn = document.querySelector(".fa-pen-to-square");
        editBtn.addEventListener('click', function () {
            editBtn.parentElement.contentEditable = true;

            newInstruction.addEventListener('keypress', function (event) {
                if (event.charCode === 13) {
                    editBtn.parentElement.contentEditable = false;
                }
            });
        });
    }
}

const runAddIngredients = () => {
    if (ingredientsDesc.value) {
        let newIngredient = document.createElement("li");
        newIngredient.classList.add("ingredient__list__item");
        newIngredient.innerHTML = `${ingredientsDesc.value}  <i class="fa-regular fa-pen-to-square clickable" data-unicode="f2ed"></i>
                        <i class="fa-regular fa-trash-can clickable" data-uni></i>`;
        ingredientsList.appendChild(newIngredient);
        ingredientsDesc.value = ""
        const delBtn = document.querySelector(".fa-trash-can");
        delBtn.addEventListener('click', function () {
            delBtn.parentElement.parentElement.removeChild(newIngredient);
            console.log(delBtn);
        });
        const editBtn = document.querySelector(".fa-pen-to-square");
        editBtn.addEventListener('click', function () {
            editBtn.parentElement.contentEditable = true;
            newIngredient.addEventListener('keypress', function (event) {
                if (event.charCode === 13) {
                    editBtn.parentElement.contentEditable = false;
                }

            })

        });
    }
}

const addInstruction = () => {
    instructionAddingBtn.addEventListener("click", function () {
        runAddInstruction()
    });
   instructionDesc.addEventListener("keypress", function (event){
        if (event.charCode === 13) {
           runAddInstruction()
        }
    })
}




const addIngredients = () => {
    ingredientAddingBtn.addEventListener("click", function () {
        runAddIngredients()
    })
    ingredientsDesc.addEventListener("keypress", function (event){
        if(event.charCode === 13){
            runAddIngredients()
        }
    })
}

addIngredients()
addInstruction()

const addRecipe = (event) => {
    const allRecipes = [];
    let recipeCounter = 1;
    event.preventDefault();
    if (recipeName.value && recipeDesc.value) {
        const newRecipe = new Recipe(recipeCounter, recipeName.value, recipeDesc.value);
        const ingredientListAll = ingredientsList.querySelectorAll("li");
        const instructionsListAll = instructionList.querySelectorAll("li");
        instructionsListAll.forEach(function (element) {
            newRecipe.instruction.push(element.innerText);
        });
        ingredientListAll.forEach(function (element) {
            newRecipe.ingredients.push(element.innerText);
        });
        recipeCounter++;
        allRecipes.push(newRecipe);
        recipeName.value = "";
        recipeDesc.value = "";
        instructionsListAll.forEach(function (element) {
            instructionList.removeChild(element)
        });
        ingredientListAll.forEach(function (element) {
            ingredientsList.removeChild(element);
        });
    } else {
        alert('Dodaj nazwę i opis przepisu, resztę możesz dodać później :-)!!')
    }
    recipeAddingBtn.addEventListener('click', addRecipe);
}


const recipeFullName = document.querySelectorAll("#recipe-name");
const recipeFullDescription = document.querySelector("#recipe-desc");
const recipeAllIngredients = document.querySelector("#ins");

const savedRecipe = localStorage.getItem("recipe");

const saverRecipeToLocalStorage = (event) => {
    event.preventDefault();
    localStorage.setItem("recipe", recipeFullName.value, recipeFullDescription.value, recipeFullDescription.value);

};


const allMyRecipes = localStorage.getItem('recipes');
const recipes = JSON.parse(allMyRecipes) || [];

const ul = document.querySelector('.recipes__container_list');

recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${recipe.id}</span>
    <span>${recipe.name}</span>
    <span>${recipe.description}</span>
    <span>
      <i class="fa-solid fa-pencil"></i> 
      <i class="fa-solid fa-trash"></i>
    </span>
  `;
    ul.appendChild(li);
});

const section = document.getElementById('all-recipes');
section.classList.remove('not-visible');



