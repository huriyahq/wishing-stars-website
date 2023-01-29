const logo = document.getElementById("navLogo");

logo.addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("nav__menu_show");
    document.getElementById("navLogo").classList.toggle("nav__logo_show");

});