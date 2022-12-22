/* 
==============================================================================================================================
Page event listeners
==============================================================================================================================
*/

let menuIcon = document.querySelector("#menu");
let nav = document.getElementById("nav-bar");
let closeNav = document.querySelector("#close-nav");
let popUp = document.getElementById("pop-up");
let closePopUp = document.getElementById("close-table");

menuIcon.addEventListener("click", () => {
    nav.classList.add("showNav");
});

closeNav.addEventListener("click", () => {
    nav.classList.remove("showNav");
});

closePopUp.addEventListener("click", () => {
    closePop();
});

function deleteAllChildren(allItems) {
    let child = allItems.lastElementChild;
    while (child) {
        allItems.removeChild(child);
        child = allItems.lastElementChild;
    }
}

function closePop() {
    popUp.classList.remove("show-pop-up");
    let tableMain = document.getElementById("all-tables");
    deleteAllChildren(tableMain);
    createAllTables(tableListMain);
}

/* 
==============================================================================================================================
table section
==============================================================================================================================
*/
class Table {
    constructor(id) {
        this.id = id;
        this.title = `Table ${id}`;
        this.itemsOrdered = [];
        this.totalItems = 0;
        this.totalCost = 0;
        this.itemsOrderedId = [];
        this.itemQty = [];
    }
}

function getTableList() {
    let tableCount = 5;
    let tableList = {};
    for (let i = 1; i <= tableCount; ++i) {
        tableList[i] = new Table(i);
    }
    return tableList;
}

const tableListMain = getTableList();
createAllTables(tableListMain);

function createAllTables(tableList) {
    let tableMain = document.getElementById("all-tables");
    for (let i in tableList) {
        let newTable = createTable(tableList[i]);
        tableMain.appendChild(newTable);
    }
}

function createTable({ id, title, totalItems, totalCost }) {
    let table = createTableDiv(id, title, totalItems, totalCost);
    table.addEventListener("drop", (e) => {
        handleDrop(e, id, title, totalItems, totalCost);
    });
    table.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    table.addEventListener("click", () => {
        handleClick(id);
    });

    return table;
}

function createTableDiv(id, title, totalItems, totalCost) {
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
    return table;
}

function handleClick(id) {
    let generateBill = document.getElementById("generate-bill");
    generateBill.setAttribute("name", id);
    const popUp = document.getElementById("pop-up");
    popUp.classList.add("show-pop-up");
    deleteBillItems();
    changeBillHeading(id);
    displayBillItems(id);
    billTotal(id);
}

function handleDrop(e, id, totalItems, totalCost) {
    const draggedItem = e.dataTransfer.getData("text");
    const { title, cost } = dummyFoodItems[draggedItem];

    if (!tableListMain[id].itemsOrdered.includes(title)) {
        let { itemsOrdered, totalItems, totalCost, itemsOrderedId, itemQty } =
            tableListMain[id];
        itemsOrdered = [...itemsOrdered, title];
        totalItems = ++totalItems;
        totalCost = totalCost + cost;
        itemsOrderedId = [...itemsOrderedId, draggedItem];
        itemQty = [...itemQty, 1];
        tableListMain[id] = {
            ...tableListMain[id],
            itemsOrdered,
            totalCost,
            totalItems,
            itemsOrderedId,
            itemQty,
        };
        let allItems = document.getElementById("all-tables");
        deleteAllChildren(allItems);
        createAllTables(tableListMain);
    }
}

const tablesInput = document.getElementById("filter-table");
tablesInput.addEventListener("input", (e) => {
    const key = e.target.value;
    filterTables(key);
});

function filterTables(key) {
    let regex = new RegExp(key, "i");
    let allItems = document.getElementById("all-tables");

    displayAll(allItems);

    let child = allItems.firstElementChild;
    while (child) {
        if (!regex.test(child.firstElementChild.innerHTML)) {
            child.style.display = "none";
        }
        child = child.nextElementSibling;
    }
}

function displayAll(allItems) {
    let child = allItems.firstElementChild;
    while (child) {
        child.style.display = "block";
        child = child.nextElementSibling;
    }
}

/* 
==============================================================================================================================
food items section
==============================================================================================================================
*/

const dummyFoodItems = {
    0: {
        title: "Chilly baby corn",
        cost: 170,
        tags: ["veg", "starters"],
    },
    1: {
        title: "Veg Manchurian",
        cost: 150,
        tags: ["veg", "starters"],
    },
    2: {
        title: "Paneer 65",
        cost: 240,
        tags: ["veg", "starters"],
    },
    3: {
        title: "Chilly Paneer",
        cost: 220,
        tags: ["veg", "starters"],
    },
    4: {
        title: "Chilly Mushroom",
        cost: 190,
        tags: ["veg", "starters"],
    },
    5: {
        title: "Chicken 65",
        cost: 210,
        tags: ["non veg", "starters"],
    },
    6: {
        title: "Red Chilli Chicken",
        cost: 220,
        tags: ["non veg", "starters"],
    },
    7: {
        title: "Pepper chicken",
        cost: 260,
        tags: ["non veg", "starters"],
    },
    8: {
        title: "Chicken Manchurian",
        cost: 210,
        tags: ["non veg", "starters"],
    },
    9: {
        title: "Chilli prawns",
        cost: 250,
        tags: ["non veg", "starters"],
    },
    10: {
        title: "Chicken lolly pops",
        cost: 180,
        tags: ["non veg", "starters"],
    },
    11: {
        title: "Dum Biriyani",
        cost: 190,
        tags: ["non veg", "non veg Biriyani"],
    },
    12: {
        title: "Chicken fry Biriyani",
        cost: 220,
        tags: ["non veg", "non veg Biriyani"],
    },
    13: {
        title: "Dum Biriyani",
        cost: 190,
        tags: ["non veg", "non veg Biriyani"],
    },
    14: {
        title: "Prawn Biriyani",
        cost: 280,
        tags: ["non veg", "non veg Biriyani"],
    },
    15: {
        title: "Mutton Dum Biriyani",
        cost: 300,
        tags: ["non veg", "non veg Biriyani"],
    },
    16: {
        title: "Chicken lollypop biriyani",
        cost: 280,
        tags: ["non veg", "non veg Biriyani"],
    },
    17: {
        title: "Veg Biriyani",
        cost: 130,
        tags: ["veg", "veg Biriyani"],
    },
    18: {
        title: "Paneer Biriyani",
        cost: 270,
        tags: ["veg", "veg Biriyani"],
    },
    19: {
        title: "Biriyani Rice",
        cost: 100,
        tags: ["veg", "veg Biriyani"],
    },
    20: {
        title: "Mushroom Biriyani",
        cost: 180,
        tags: ["veg", "veg Biriyani"],
    },
    21: {
        title: "Tandoori",
        cost: 380,
        tags: ["non veg", "tandoori"],
    },
    22: {
        title: "kalmi kabab",
        cost: 220,
        tags: ["non veg", "tandoori"],
    },
    23: {
        title: "Tandoori Roti",
        cost: 45,
        tags: ["non veg", "tandoori"],
    },
    24: {
        title: "Dal fry",
        cost: 120,
        tags: ["veg", "curries"],
    },
    25: {
        title: "Palak Panner",
        cost: 160,
        tags: ["veg", "curries"],
    },
    26: {
        title: "alu jeera",
        cost: 150,
        tags: ["veg", "curries"],
    },
    27: {
        title: "Alu mutter",
        cost: 150,
        tags: ["veg", "curries"],
    },
    28: {
        title: "Cashew Panner",
        cost: 270,
        tags: ["veg", "curries"],
    },
    29: {
        title: "Chicken curry",
        cost: 160,
        tags: ["non veg", "curries"],
    },
    30: {
        title: "Mutton curry",
        cost: 200,
        tags: ["non veg", "curries"],
    },
    31: {
        title: "Prawns curry",
        cost: 250,
        tags: ["non veg", "curries"],
    },
    32: {
        title: "Panner kholapuri",
        cost: 240,
        tags: ["veg", "curries"],
    },
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

    /* Evente listeners for dishes */
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
    const foodMain = document.getElementById("all-food-items");
    for (let a in obj) {
        let newItem = createFoodItem(obj[a], a);
        foodMain.appendChild(newItem);
    }
}
creatAllFoodItmes(dummyFoodItems);
function filterFoodItems(obj, key) {
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
    filterFoodItems(dummyFoodItems, key);
});

function filterFoodItems(obj, key) {
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

/* 
==============================================================================================================================
Bill section
==============================================================================================================================
*/

function displayBillItems(tableId) {
    let billCon = document.getElementById("bill-content");
    let itemIdsArr = tableListMain[tableId].itemsOrderedId;
    let l = itemIdsArr.length;
    for (let i = 1; i <= l; ++i) {
        let eachId = itemIdsArr[i - 1];
        let { title, cost } = dummyFoodItems[eachId];
        let child = createBillItem(i, eachId, title, cost, tableId);
        billCon.appendChild(child);
    }
}

function createBillItem(siNO, foodId, title, cost, tableId) {
    let div = document.createElement("div");
    div.classList.add("bill-content-row");

    let p1 = document.createElement("p");
    p1.innerHTML = `${siNO}.`;

    let p2 = document.createElement("p");
    p2.innerHTML = title;

    let p3 = document.createElement("p");
    p3.innerHTML = `Rs.${cost}`;

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", foodId);
    input.setAttribute("min", "1");
    let qty = tableListMain[tableId].itemQty[siNO - 1];
    input.setAttribute("value", qty.toString());
    let delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fa-solid fa-trash");
    delIcon.addEventListener("click", () => {
        upDateTableLIist(foodId, tableId);
        div.remove();
        deleteBillItems();
        billTotal(tableId);
        displayBillItems(tableId);
    });

    input.addEventListener("input", (e) => {
        inputFilter(e, siNO, foodId, title, cost, tableId);
    });

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(input);
    div.appendChild(delIcon);

    return div;
}

function inputFilter(e, siNO, foodId, title, cost, tableId) {
    let totCost = tableListMain[tableId].totalCost;
    let qty = parseInt(e.target.value);
    let prevQty = parseInt(tableListMain[tableId].itemQty[siNO - 1]);
    let toAdd = dummyFoodItems[foodId].cost * qty;
    tableListMain[tableId].itemQty[siNO - 1] = qty.toString();
    tableListMain[tableId].totalCost =
        totCost - prevQty * dummyFoodItems[foodId].cost + toAdd;
    billTotal(tableId);
}

function deleteBillItems() {
    let bill = document.getElementById("bill-content");
    let child = bill.firstElementChild.nextElementSibling;
    let next;
    while (child) {
        next = child.nextElementSibling;
        bill.removeChild(child);
        child = next;
    }
}

function changeBillHeading(id) {
    let head = document.getElementById("bill-heading");
    head.innerHTML = `Table ${id} | order details`;
}

function billTotal(tableId) {
    let totalBillCost = tableListMain[tableId].totalCost;
    let totalDisplay = document.getElementById("bill-total");
    totalDisplay.innerHTML = `Total Rs.${totalBillCost}`;
}

function upDateTableLIist(foodId, tableId) {
    const { title, cost } = dummyFoodItems[foodId];
    const mainIndex = tableListMain[tableId].itemsOrdered.indexOf(title);
    const table = tableListMain[tableId];
    const currCost = table.totalCost;
    let toSub = table.itemQty[mainIndex] * cost;
    table.totalCost = currCost - toSub;
    table.totalItems -= 1;
    table.itemsOrdered.splice(mainIndex, 1);
    table.itemsOrderedId.splice(mainIndex, 1);
    table.itemQty.splice(mainIndex, 1);
}

/* 
==============================================================================================================================
food items section
==============================================================================================================================
*/

let generateBill = document.getElementById("generate-bill");
generateBill.addEventListener("click", (e) => {
    const tableId = e.target.name;
    const grandTotal = tableListMain[tableId].totalCost;
    if (
        window.confirm(
            `Total amount  : ${grandTotal}\nClick ok to generate bill`
        )
    ) {
        clearBill(tableId);
        deleteBillItems();
        closeBill();
        alert("Thank you visit again!");
    }
});

function clearBill(tableId) {
    const table = tableListMain[tableId];
    table.itemQty = [];
    table.itemsOrdered = [];
    table.itemsOrderedId = [];
    table.totalCost = 0;
    table.totalItems = 0;
}

function closeBill() {
    popUp.classList.remove("show-pop-up");
    let tableMain = document.getElementById("all-tables");
    deleteAllChildren(tableMain);
    createAllTables(tableListMain);
}
