const logo = document.getElementById("navLogo");

logo.addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("nav__menu_show");
    document.getElementById("navLogo").classList.toggle("nav__logo_show");

});

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let basketIcon = document.getElementById("basketAmount");
    basketIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();