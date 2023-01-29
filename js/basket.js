const logo = document.getElementById("navLogo");

logo.addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("nav__menu_show");
});


let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);