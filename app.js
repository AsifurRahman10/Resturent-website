let sortValue = []
// get all category
const getAllMenu = (dataBtn = false) => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            if (dataBtn == true) {
                console.log(data);
                displayAllCategory(data.categories)
            }
            else {
                displayAllCategory(data.categories.slice(0, 6))
            }
        })
}

// get category wise food
const displayAllFoodByCategory = (category) => {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {
            sortValue = data.meals;
            categoryWiseFood(sortValue)
        })
}

// get food details

const showMealDetails = (data) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`)
        .then(res => res.json())
        .then(data => showFoodDetails(data.meals[0]))
}

// get food by search
const mealSearch = (search) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
            categoryWiseFood(data.meals)
        })
}

// sort btn
document.getElementById('sort-btn').addEventListener('click', () => {
    const sortedDownValue = sortValue.sort((a, b) => {
        if (a.strMeal < b.strMeal) {
            return -1; // t1 comes before t2
        }
        if (a.strMeal > b.strMeal) {
            return 1; // t1 comes after t2
        }
        return 0; // They are equal
    })
    categoryWiseFood(sortedDownValue);
})

// show food details

const showFoodDetails = (data) => {
    document.getElementById('meal-Name').innerText = data.strMeal;
    document.getElementById('Category').innerText = data.strCategory;
    document.getElementById('img-modal').src = data.strMealThumb;

    console.log(data);
    my_modal_1.showModal();
}


// display category wise food
const categoryWiseFood = (data) => {
    document.getElementById('sort-btn').disabled = false;
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.remove('grid');
    menuContainer.innerHTML = "";
    const spanner = document.createElement('div');
    spanner.innerHTML = `
     <span class="loading loading-infinity loading-2xl"></span>
    `
    menuContainer.appendChild(spanner);
    setTimeout(() => {
        menuContainer.classList.add('grid');
        menuContainer.innerHTML = "";
        document.getElementById('show-all').classList.add('hidden');
        data.forEach(food => {
            const div = document.createElement('div');
            div.classList = "flex items-center justify-center border-2 gap-8 p-4 rounded-lg"
            div.innerHTML = `
        <div class = "flex-1">
            <img class="w-full rounded-lg" src="${food.strMealThumb}" alt="" />
          </div>
          <div class="space-y-3 flex-1">
            <h2 class="font-bold text-2xl">${food.strMeal}</h2>
            <p class="text-[#706F6F]"> Meal ID:
            ${food.idMeal}
            </p>
              <button onclick="showMealDetails('${food.idMeal}')"
                class="text-[#FFC107] underline-offset-4 border-b-2 border-[#FFC107]"
              >
                Know More
              </button>
          </div>
        `
            menuContainer.appendChild(div);
        })
    }, 2000);


}


const displayAllCategory = (meals) => {

    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = "";
    meals.forEach(element => {

        const div = document.createElement('div');
        div.classList = "flex items-center justify-center border-2 gap-2 p-4 rounded-lg"
        div.innerHTML = `
        <div class = "flex-1">
            <img class="w-full" src="${element.strCategoryThumb}" alt="" />
          </div>
          <div class="space-y-3 flex-1">
            <h2 class="font-bold text-2xl">${element.strCategory}</h2>
            <p class="text-[#706F6F]">
              ${element.strCategoryDescription.slice(0, 100)}
            </p>
              <button onclick = "getAllMeal('${element
                .strCategory
            }')"
                class="text-[#FFC107] underline-offset-4 border-b-2 border-[#FFC107]"
              >
                View Details
              </button>
          </div>
        `
        menuContainer.appendChild(div);
    });
}

// show all menu
document.getElementById('show-all').addEventListener('click', () => {
    let showAll = true;
    getAllMenu(showAll)
})

// get meal food

const getAllMeal = (data) => {
    displayAllFoodByCategory(data);
}

// search btn
document.getElementById('search-btn').addEventListener('click', () => {
    const searchText = document.getElementById('search-input').value;
    mealSearch(searchText);
})

getAllMenu()