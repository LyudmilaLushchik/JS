const goods = [
    {
        id: 1,
        name: 'Кепка',
        description: 'Оранжевая',
        sizes: [50, 56],
        price: 200,
        available: true
    },
    {
        id: 2,
        name: 'Футболка',
        description: 'Женская',
        sizes: [46, 48, 52],
        price: 300,
        available: true
    },
    {
        id: 3,
        name: 'Шорты',
        description: 'Мужские',
        sizes: [46, 48, 52],
        price: 500,
        available: true
    },
    {
        id: 4,
        name: 'Панамка',
        description: 'Детская',
        sizes: [44, 46, 50],
        price: 150,
        available: false
    },
    {
        id: 5,
        name: 'Сарафан',
        description: 'Женский',
        sizes: [46, 48, 52],
        price: 800,
        available: false
    },
];

const cart = [
    {
       good: goods[1],
       amount: 3 
    },
    {
        good: goods[2],
        amount: 5 
    },

];


// Функция добавления товара в корзину 
function addToCart(id) {
    let goodsItem = goods.find(item => item.id === id && item.available === true);
    if (goodsItem) {
        let cartItem = cart.find(item => item.good === goodsItem);
        if (cartItem) {
            cartItem.amount += 1;
        } else { 
            let idx = goods.findIndex(item => item.id === id); 
            cart.push({good: goods[idx], amount: 1}); 
        }
    } else {
        console.log(`В каталоге нет товара с id ${id}, либо товар недоступен для продажи.`); 
    }
}

// Функция удаления одного товара из корзины
function delFromCart(id) {
    let goodsItem = goods.find(item => item.id === id);
    if (goodsItem) {
        let idx = cart.findIndex(item => item.good === goodsItem);
        if (cart[idx].amount === 1) {
            cart.splice(idx, 1);
        } else if (cart[idx].amount > 1) {
            cart[idx].amount -= 1;
        }
    }   
}

// Функция полной очистки корзины
function emptyCart() {
    cart.length = 0; 
}

// Функция вычисления общего количества и стоимости товаров в корзине
function totalInCart(cart) {
    let totalAmount = 0;
    let totalSum = 0;
    let total = {};
    for (let i=0; i < cart.length; i++) {
        totalSum += cart[i].good.price * cart[i].amount;         
        totalAmount += cart[i].amount;
        total = {'TotalAmount': totalAmount, 
                 'TotalSum': totalSum};
    }    
    return total;
}

emptyCart()
addToCart(7) // добавление в корзину товара с несуществующим id
addToCart(4) // добавление в корзину товара, недоступного для продажи
addToCart(1)
addToCart(1)
addToCart(1)
addToCart(2)
addToCart(3)
delFromCart(3)
delFromCart(1)
console.log(cart)
console.log(totalInCart(cart))