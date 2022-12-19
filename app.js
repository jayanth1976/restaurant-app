let menuIcon = document.querySelector("#menu");
let nav = document.getElementById("nav-bar");
let closeNav = document.querySelector("#close-nav");
menuIcon.addEventListener("click", () => {
    nav.classList.add("showNav");
});
closeNav.addEventListener("click", () => {
    nav.classList.remove("showNav");
});

const dummyFoodItems = {
    0: {
        title: "Biriyani",
        cost: 100,
    },
    1: {
        title: "Fried Rice",
        cost: 70,
    },
    2: {
        title: "Noodles",
        cost: 100,
    },
    3:{
        title:"Samosa",
        cost:20
    },
    4:{
        title:"Prawns Biriyani",
        cost:300
    },
    5:{
        title:"Veg Biriyani",
        cost:200
    },
    6:{
        title:"Panner kaju biriyani",
        cost:500
    }
};

function createFoodItem({ title, cost }) {
    let item = document.createElement("div");
    item.classList.add("food-item");
    let para1 = document.createElement("p");
    para1.classList.add("food-item-title");
    para1.innerHTML = title;
    let para2 = document.createElement("p");
    para2.classList.add("food-item-cost");
    para2.innerHTML = `Rs.${cost}`;
    item.appendChild(para1);
    item.appendChild(para2);
    return item;
}

function creatAllFoodItmes(obj) {
    // console.log(obj)
    const foodMain = document.getElementById("all-food-items");
    for (let a in obj) {
        let newItem = createFoodItem(obj[a]);
        foodMain.appendChild(newItem);
    }
}

creatAllFoodItmes(dummyFoodItems);

function deleteAllChildren(allItems) {
    let child = allItems.lastElementChild; 
    while (child) {
        allItems.removeChild(child);
        child = allItems.lastElementChild;
    }
}

function filter_foodItems(obj,key) {
    let regex = new RegExp(key);
    let allItems = document.getElementById("all-food-items");
    deleteAllChildren(allItems)
    let filteredItems = {};
    let index = 0;
    for (let i in obj) {
        if (regex.test(obj[i].title)) {
            filteredItems = {
                ...filteredItems,
                [i]: { title: obj[i].title, cost: obj[i].cost },
            };
            i++;
        }
    }
    creatAllFoodItmes(filteredItems)
}

const input = document.getElementById('filter');
input.addEventListener('input',(e)=>{
    const key = e.target.value;
    filter_foodItems(dummyFoodItems,key)

})





/* Table */
