// Класс для хранения данных о товаре.
class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available; 
    }
}


// Класс для хранения каталога товаров.
class GoodsList {
    #goods = [];
    
    constructor() {
        this.filter =  /./;
        this.sortPrice = false;
        this.sortDir = true;
    }    
    
    // Метод возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price.
    get list() {
        const filteredGoods = this.#goods.filter((good) => this.filter.test(good.name));
        const sortedGoods = filteredGoods.sort((a, b) => {
            if (this.sortPrice) {
                if (this.sortDir) {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            } else {
                return 0;
            }
        });
            return sortedGoods.filter((good) => good.available);
    }

    // Добавление товара в каталог.
    add(good) {
        this.#goods.push(good);
    }

    // Удаление товара из каталога по его id.
    remove(id) {
        const idx = this.#goods.findIndex((good) => good.id === id);
        if (idx !== -1) {
            this.#goods.splice(idx, 1);
        }
    }
}


// Класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством amount.
class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}


// Класс для хранения данных о корзине товаров.
class Basket {
    constructor() {
        this.goods = [];
    }

    // Метод возвращает общую стоимость товаров в корзине.
    get totalAmount() {
        return this.goods.reduce((total, basketGood) => total + (basketGood.price * basketGood.amount), 0);
    }

    // Метод возвращает общее количество товаров в корзине.
    get totalSum() {
        return this.goods.reduce((total, basketGood) => total + basketGood.amount, 0);
    }

    // Метод добавляет товар в корзину, если товар уже есть - увеличивает количество.
    add(good, amount) {
        const basketGood = this.goods.find((basketGood) => basketGood.id === good.id);
        if (basketGood) {
            basketGood.amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    // Метод уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется.
    remove(good, amount) {
       const idx = this.goods.findIndex((basketGood) => basketGood.id === good.id);
        if (idx !== -1) {
            this.goods[idx].amount -= amount;
            if (this.goods[idx].amount <= 0) {
                this.goods.splice(idx, 1);
            }
        }
    }

    // Метод очищает содержимое корзины.
    clear() {
        this.goods = [];
    }

    // Метод удаляет из корзины товары, имеющие признак available === false.
    removeUnavailable() {
        this.goods = this.goods.filter((basketGood) => basketGood.available);
    }
}

// Создание экземпляров класса Good.
const good1 = new Good('1', 'Ботинки', 'мужские', [43, 44], 1000, true);
const good2 = new Good('2', 'Ботинки', 'женские', [38, 40], 1100, true);
const good3 = new Good('3', 'Ботинки', 'детские', [32, 36], 1200, false);
const good4 = new Good('4', 'Туфли', 'женские', [40, 42], 2000, false);
const good5 = new Good('5', 'Сланцы', 'детские', [28, 30], 1500, true);

// Создание экземпляра класса GoodsList.
const catalog = new GoodsList();
catalog.add(good1);
catalog.add(good2);
catalog.add(good3);
catalog.add(good4);
catalog.add(good5);

// Установка фильтра и сортировки.
catalog.filter = /ботинки/i;
catalog.sortPrice = true;

// Вывод списка товаров.
console.log("Список товаров: ");
console.log(catalog.list);

// Создание экземпляра класса Basket.
const cart = new Basket();
cart.add(good1, 3);
cart.add(good2, 1);
cart.add(good3, 1); // товар, недоступный для продажи
cart.add(good4, 2); // товар, недоступный для продажи
cart.add(good5, 3);

// Вывод общей стоимости и количества товаров в корзине.
console.log("Корзина: ");
console.log("Общая стоимость: " + cart.totalAmount);
console.log("Общее количество: " + cart.totalSum);

// Удаление товара из корзины.
cart.remove(good1, 1);
cart.remove(good2, 1);
console.log("После удаления товаров: ");
console.log("Общая стоимость: " + cart.totalAmount);
console.log("Общее количество: " + cart.totalSum);

// Удаление из корзины товаров, недоступных для продажи.
cart.removeUnavailable();
console.log("После удаления товаров, недоступных для продажи: ");
console.log("Общая стоимость: " + cart.totalAmount);
console.log("Общее количество: " + cart.totalSum);

// Очистка корзины.
cart.clear();