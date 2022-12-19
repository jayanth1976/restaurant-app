let menuIcon = document.querySelector("#menu");
let nav = document.getElementById("nav-bar");
let closeNav = document.querySelector("#close-nav");
menuIcon.addEventListener("click", () => {
    nav.classList.add("showNav");
});
closeNav.addEventListener("click", () => {
    nav.classList.remove("showNav");
});
