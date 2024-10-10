const getAllMenu = (dataBtn = false) => {
    // console.log(data);
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            if (dataBtn == true) {
                console.log(data);
                displayAllMeal(data.categories)
            }
            else {
                displayAllMeal(data.categories.slice(0, 6))
                console.log(data.categories.slice(0, 6));
            }
        })
}

const displayAllMeal = (meals) => {
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
            <a href=""
              ><button
                class="text-[#FFC107] underline-offset-4 border-b-2 border-[#FFC107]"
              >
                View Details
              </button></a
            >
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


getAllMenu()