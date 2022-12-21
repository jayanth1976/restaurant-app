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
    popUp.classList.remove("show-pop-up");
    let tableMain = document.getElementById("all-tables");
    deleteAllChildren(tableMain);
    createAllTables(tableListMain);
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
        this.itemsOrderedId = [];
        this.itemQty = [];
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

        if (!tableListMain[id].itemsOrdered.includes(title)) {
            let {
                itemsOrdered,
                totalItems,
                totalCost,
                itemsOrderedId,
                itemQty,
            } = tableListMain[id];
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
    });
    table.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    table.addEventListener("click", (e) => {
        let generateBill = document.getElementById("generate-bill");
        generateBill.setAttribute("name", id);
        const popUp = document.getElementById("pop-up");
        popUp.classList.add("show-pop-up");
        deleteBillItems();
        changeBillHeading(id);
        displayBillItems(id);
        billTotal(id);
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

// function filterTables(obj, key) {
//     let regex = new RegExp(key, "i");
//     let allItems = document.getElementById("all-tables");
//     deleteAllChildren(allItems);
//     let filteredItems = {};
//     let index = 1;
//     for (let i in obj) {
//         if (regex.test(obj[i].title)) {
//             filteredItems = {
//                 ...filteredItems,
//                 [i]: { ...obj[i] },
//             };
//             i++;
//         }
//     }
//     createAllTables(filteredItems);
// }

const tablesInput = document.getElementById("filter-table");
tablesInput.addEventListener("input", (e) => {
    const key = e.target.value;
    filterTables(key);
});

// const check = document.getElementById('all-tables')
// console.log(check.firstElementChild.firstElementChild.innerHTML);

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
============
    Bill
============
*/

function displayBillItems(tableId) {
    let billCon = document.getElementById("bill-content");
    let itemIdsArr = tableListMain[tableId].itemsOrderedId;
    let l = itemIdsArr.length;
    for (let i = 1; i <= l; ++i) {
        let eachId = itemIdsArr[i - 1];
        // console.log(eachId);
        let { title, cost } = dummyFoodItems[eachId];
        let child = createBillItem(i, eachId, title, cost, tableId);
        // console.log(child,title,cost)
        billCon.appendChild(child);
    }
}

function createBillItem(siNO, foodId, title, cost, tableId) {
    // console.log('in child',title,cost)
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
    // input.setAttribute("name", "1");
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
        let totCost = tableListMain[tableId].totalCost;
        let qty = parseInt(e.target.value);
        // let prevQty = parseInt(input.getAttribute("name"));
        let prevQty = parseInt(tableListMain[tableId].itemQty[siNO - 1]);
        let toAdd = dummyFoodItems[foodId].cost * qty;
        // input.setAttribute("name", qty.toString());
        tableListMain[tableId].itemQty[siNO - 1] = qty.toString();
        tableListMain[tableId].totalCost =
            totCost - prevQty * dummyFoodItems[foodId].cost + toAdd;
        // console.log(tableListMain[tableId])
        billTotal(tableId);
    });

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(input);
    div.appendChild(delIcon);

    return div;
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
=============
generate bill
============
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
