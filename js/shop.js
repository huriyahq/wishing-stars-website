let shop = document.getElementById("shop");

// let shopItemsData = [{  
//     id: "a1hs8ha",
//     name: "Blue Star",
//     price: 45,
//     desc: "Sweeter dreams.",
//     img: "../images/items/blue-star.png"
// }, {
//     id: "a9fs7fw",
//     name: "Coral Star",
//     price: 60,
//     desc: "Good luck.",
//     img: "../images/items/coral-star.png"
// }, {
//     id: "a5wt7wa",
//     name: "Pink Star",
//     price: 20,
//     desc: "Balance energies.",
//     img: "../images/items/pink-star.png"
// }, {
//     id: "a4rt2kp",
//     name: "Purple Star",
//     price: 55,
//     desc: "Motivation boosting.",
//     img: "../images/items/purple-star.png"
// }];

// let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((item) => {
        let {id, name, price, desc, img} = item;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <article id=item-id-${id} class="shop-item">
            <img src=${img} alt="blue star" class="shop-item-img">
        
            <div class="details">
                <h2 class="item-name">${name}</h2>
                <p>${desc}</p>
        
                <div class="price-qty">
                    <h3 class="item-price">£ ${price}</h3>
        
                    <div class="item-qty">
                        <button class="qty-btn" onclick="decrement(${id})">
                        &minus;
                        </button>

                        <span id=${id} class="qty">${search.item === undefined ? 0 : search.item}</span>

                        <button class="qty-btn" onclick="increment(${id})">
                        &plus;
                        </button>
                    </div>
                </div>
            </div>
        </article>`
    }).join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));

};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// let calculation = () => {
//     let basketIcon = document.getElementById("basketAmount");
//     basketIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
// }

// calculation();