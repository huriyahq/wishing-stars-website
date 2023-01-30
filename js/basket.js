let basketOptions = document.getElementById("basketOptions");
let basketItems = document.getElementById("basketItems");
let basketSummary = document.getElementById("basketSummary");


// Function generates cards displaying basket items
let generateBasketItems = () => {
    if(basket.length !==0){
        // Run this code if the basket is not empty i.e. there is data in local storage
        // This will display all the basket items
        return (basketItems.innerHTML = basket.map((x) => {
            // Destructure shopItemsData
            let { id,item } = x;
            // Search function to search shopItemsData
            // Match id from basket (x) to id in shopItemsData database (y)
            // If search function finds something, it will return it. If it doesn't find something, it will return an empty array
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
            <article class="basket-item">
                <img src=${img} alt="" class="basket-item__img" />
                <section class="basket-item__details">

                    <div>
                        <h3>${name}<br />
                        <span>£ ${price}</span>
                        </h3>
                        <button class="close-btn" onclick="removeItem(${id})">&#x2717;</button>
                    </div>

                    <div>
                        <h4 class="basket-item__price">£ ${item * price}</h4>
                        <div>
                            <button class="qty-btn" onclick="decrement(${id})">&minus;</button>

                            <span id=${id} class="qty">${item}</span>

                            <button class="qty-btn" onclick="increment(${id})">&plus;</button>

                        </div>
                    </div>
                </section>
            </article>
            `
        }).join(""));
    }
    else {
        // Run this code if the basket is empty i.e. no data in local storage
        // This will tell the user that the basket is empty
        basketItems.innerHTML = ``;
        basketOptions.innerHTML = `
        <h2>Your basket is empty</h2>
        <a href="shop.html">
            <button class="btn primary-btn">Shop</button>
        </a>
        
        <a href="../index.html">
        <button class="btn secondary-btn">Home</button>
        </a>`;
    }
};

generateBasketItems();

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
    // Call generateBasketItems() to re-render cards with updated data
    generateBasketItems();
    // update(selectedItem.id);
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
    // Call generateBasketItems() to re-render cards with updated data
    generateBasketItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    basketTotal();
    calculation();
};

// Remove item from basket when user clicks on x
// Uses item id to identify which item is being clicked on for deletion
let removeItem = (id) => {
    let selectedItem = id;
    // Every time the user clicks on x, remove the entire object from basket
    // Filter function to go through all objects in basket and match against each id
    basket = basket.filter((x) => x.id !== selectedItem.id);
    // Call generateBasketItems() to re-render components and update items shown in basket without having to refresh
    generateBasketItems();
    // Now remove item from local storage too
    basketTotal();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

};

// Clear everything in basket
let clearAll = () => {
    basketSummary.innerHTML = "";
    basketSummary.classList.remove("basket__summary_show");
    basket = []
    generateBasketItems();
    basketTotal();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Calculate basket total
let basketTotal = () => {
    if (basket.length !==0) {
    // If there is data in the local storage i.e. there are items in the basket
    // Map through basket using id of item in ShopData, grab the price then multiply it by item to get total for that item
    // This function will return an array with totals for each item in basket (unit price x quantity)
        let amount = basket.map((x) => {
            // Destructure each object targetted by map
            let { item, id } = x;
            // Search function uses id to search against database for a match 
            let search = shopItemsData.find((y) => y.id === id) || [];
            // If there's a match, return the value for item and multiply it by the price 
            return item * search.price;
            // Use reduce method to add all the totals in the array
            // x is prev number, y is next number. Method will add first two then add next number in array to that total, etc
            // Method starts from 0
        }).reduce((x, y) => x + y, 0);

        basketSummary.classList.add("basket__summary_show");

        basketSummary.innerHTML = `
            <div>
                <h2>Subtotal</h2>
                <h2>£ ${amount}</h2>
            </div>
            <button class="btn primary-btn">Checkout</button>
            <p><em>Shipping is calculated at checkout.</em></p>
        `
        
        basketOptions.innerHTML = `
        <h2>Subtotal: £ ${amount}</h2>
        <button class="btn primary-btn">Checkout</button>
        <button class="btn secondary-btn" onclick="clearAll()">Clear All</button>
        `;
    // If there is no data in the local storage, i.e. there are no items in the basket, do nothing
    } else return;
};

basketTotal();