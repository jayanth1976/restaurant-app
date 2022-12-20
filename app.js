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
        tags: ["non veg"],
    },
    1: {
        title: "Fried Rice",
        cost: 70,
        tags: ["veg"],
    },
    2: {
        title: "Noodles",
        cost: 100,
        tags: ["non veg"],
    },
    3: {
        title: "Samosa",
        cost: 20,
        tags: ["veg", "starters"],
    },
    4: {
        title: "Prawns Biriyani",
        cost: 300,
        tags: ["non veg"],
    },
    5: {
        title: "Veg Biriyani",
        cost: 200,
        tags: ["veg"],
    },
    6: {
        title: "Kaju paneer biriyani",
        cost: 500,
        tags: ["veg"],
    },
    7: {
        title: "Chicken 65",
        cost: 500,
        tags: ["non veg"],
    },
};
const table1 = {
    // 0: {
    //     title: "Biriyani",
    //     cost: 100,
    // },
    // 1: {
    //     title: "Fried Rice",
    //     cost: 70,
    // },
    // 2: {
    //     title: "Noodles",
    //     cost: 100,
    // },
    // 3: {
    //     title: "Samosa",
    //     cost: 20,
    // },
};
const table2 = {
    // 0: {
    //     title: "Biriyani",
    //     cost: 100,
    // },
    // 1: {
    //     title: "Fried Rice",
    //     cost: 70,
    // },
    // 2: {
    //     title: "Noodles",
    //     cost: 100,
    // },
};
const table3 = {
    // 0: {
    //     title: "Biriyani",
    //     cost: 100,
    // },
    // 1: {
    //     title: "Fried Rice",
    //     cost: 70,
    // },
};
const table4 = {
    // 0: {
    //     title: "Biriyani",
    //     cost: 100,
    // },
};

function createFoodItem({ title, cost }, id) {
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
    item.setAttribute("id", id);
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", id);
    });
    return item;
}

function creatAllFoodItmes(obj) {
    // console.log(obj)
    const foodMain = document.getElementById("all-food-items");
    for (let a in obj) {
        let newItem = createFoodItem(obj[a], a);
        // newItem.addEventListener("click", (e) => {
        //     console.log(dummyFoodItems[e.target.id]);
        // });
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

function filter_foodItems(obj, key) {
    let regex = new RegExp(key, "i");
    let allItems = document.getElementById("all-food-items");
    deleteAllChildren(allItems);
    let filteredItems = {};
    let index = 0;
    for (let i in obj) {
        if (regex.test(obj[i].title) || obj[i].tags.includes(key)) {
            filteredItems = {
                ...filteredItems,
                [i]: { title: obj[i].title, cost: obj[i].cost },
            };
            i++;
        }
    }
    creatAllFoodItmes(filteredItems);
}

const input = document.getElementById("filter");
input.addEventListener("input", (e) => {
    const key = e.target.value;
    filter_foodItems(dummyFoodItems, key);
});

/* Table */

function getItemsArray(obj) {
    let items = [];
    for (let i in obj) {
        items.push(obj[i].title);
    }
    return items;
}

function calculateCost(obj) {
    let totalCost = 0;
    for (let i in obj) {
        totalCost += obj[i].cost;
    }
    return totalCost;
}

let dummyArr = [];
dummyArr.push(table1);
dummyArr.push(table2);
dummyArr.push(table3);
dummyArr.push(table4);

class Table {
    constructor(id, orderList) {
        this.id = id;
        this.title = `Table ${id}`;
        this.itemsOrdered = getItemsArray(orderList);
        this.totalItems = Object.keys(orderList).length;
        this.totalCost = calculateCost(orderList);
    }
}

function getTableList() {
    let tableList = {};
    for (let i = 1; i <= 4; ++i) {
        tableList[i] = new Table(i, dummyArr[i - 1]);
    }
    return tableList;
}

function createTable({ id, title, totalItems, totalCost }) {
    let table = document.createElement("div");
    table.classList.add("table-item");
    table.setAttribute("id", id);

    let tableTitle = document.createElement("p");
    tableTitle.classList.add("table-item-title");
    tableTitle.innerHTML = title;

    let content = document.createElement("p");
    content.classList.add("table-item-content");
    content.innerHTML = `Total items:${totalItems} | Rs.${totalCost}`;

    table.appendChild(tableTitle);
    table.appendChild(content);

    table.addEventListener("drop", (e) => {
        const draggedItem = e.dataTransfer.getData("text");
        const { title, cost } = dummyFoodItems[draggedItem];
        let { itemsOrdered, totalItems, totalCost } = tableListMain[id];
        itemsOrdered = [...itemsOrdered, title];
        totalItems = ++totalItems;
        totalCost = totalCost + cost;
        tableListMain[id] = {
            ...tableListMain[id],
            itemsOrdered,
            totalCost,
            totalItems,
        };
        let allItems = document.getElementById("all-tables");
        deleteAllChildren(allItems);
        createAllTables(tableListMain);
    });
    table.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    return table;
}

function createAllTables(tableList) {
    let tableMain = document.getElementById("all-tables");
    for (let i in tableList) {
        let newTable = createTable(tableList[i]);
        tableMain.appendChild(newTable);
    }
}

const tableListMain = getTableList();
createAllTables(tableListMain);

function filterTables(obj, key) {
    let regex = new RegExp(key, "i");
    let allItems = document.getElementById("all-tables");
    deleteAllChildren(allItems);
    let filteredItems = {};
    let index = 1;
    for (let i in obj) {
        if (regex.test(obj[i].title)) {
            filteredItems = {
                ...filteredItems,
                [i]: { ...obj[i] },
            };
            i++;
        }
    }
    createAllTables(filteredItems);
}

const tablesInput = document.getElementById("filter-table");
tablesInput.addEventListener("input", (e) => {
    const key = e.target.value;
    filterTables(getTableList(), key);
});

console.log(tableListMain);
