 class Good {
    constructor (id,name,description,sizes,price,available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
//метод - изменение признака доступности товара в каталоге
    setAvailable (newavailable) {
        this.available = newavailable;
    }
 }

 //ПРОВЕРКА 
 const p1 = new Good(1,"Рубашка", "Белая", {}, 3500, 1)
 const p2 = new Good(2,"Рубашка", "Черная", {}, 4000, 1)
 const p3 = new Good(3,"Рубашка", "Синяя", {}, 3500, 1)
 const p4 = new Good(4,"Брюки", "Черные", {}, 5000, 1)
 const p5 = new Good(5,"Джинсы", "Черные", {}, 5500, 1)
 //console.log(p1,p2,p3,p4,p5)

 p1.setAvailable(0)
 console.log(p1)


 class GoodList {
    #goods = [];
    constructor () {
        
        this.filter = /[а-я]gui/;
        this.sortPrice = false;
        this.sortDir = true;
    }

    //геттер и методы 
    //получить список товаров 
    get list() {
        let goodsSort = []
        if (this.sortPrice == true) {
            if (this.sortDir == true) {
                goodsSort = this.#goods.sort((a,b) => a.price > b.price ? 1: -1);
                return goodsSort;
            } else {
                goodsSort = this.#goods.sort((a,b) => a.price > b.price ? -1: 1);
                return goodsSort;
            }
            
        } else {
            goodsSort = this.#goods.sort((a,b) => a.name > b.name ? 1:-1).filter(
                good => this.filter.test(good.name) == true
                );
            return goodsSort;

        }
    }

    //добавить товары в каталог 
    add(good) {       
        this.#goods.push(good);
    }

    //удаление товара из каталога по его id
    remove(id) {
        this.#goods = this.#goods.filter(i => i['id'] != id)
        return this.#goods
    }
 }
 
 //ПРОВЕРКА
 //создать каталог один раз (экземпляр класса GoodList)
 const catalog = new GoodList()
 //добавить в каталог созданные экземпляры класса Good
 catalog.add(p1)
 catalog.add(p2)
 catalog.add(p3)
 catalog.add(p4)
 catalog.add(p5)

 //удалить
 catalog.remove(1)
 //получить отфильтрованный список
 catalog.list
 


 class BasketGood extends Good {
    constructor(good) {
        super();
        this.id = good.id;
        this.name = good.name;
        this.description = good.description;
        this.sizes = good.sizes;
        this.price = good.price;
        this.available = good.available;
        this.amount = 0;
    }
 }
 
//проверка - создать экземпляры класса корзины
 const b1 = new BasketGood(p1)
 const b2 = new BasketGood(p2)
 const b3 = new BasketGood(p3)
 const b4 = new BasketGood(p4)
 const b5 = new BasketGood(p5)
 
 console.log(b1)
 console.log(b2)
 console.log(b3)
 console.log(b4)
 console.log(b5)
 


 class Basket {
    constructor() {
        this.goods = [];
    }

    add(good,amount) {
        good['amount'] = amount;
        if(this.goods.length==0) {
            this.goods.push(good);
        } else {
            let counter = 0;
            for (let i = 0; i<this.goods.length;i++) {
                if(this.goods[i]['id']==good['id']) {
                    this.goods[i]['amount']+=good['amount'];
                    counter++;
                }
            }
            if (counter==0) {
                this.goods.push(good);
            }
        }
        return this.goods;
    }

    remove(good,amount) {
        for (let i=0; i<this.goods.length;i++) {
            if (this.goods[i]['id']==good['id']) {
                this.goods[i]['amount'] -=amount;
                if (this.goods[i]['amount']<=0) {
                    this.goods.splice(i,1);
                }            
            }
        }
        return this.goods;
    }


    clear() {
        return this.goods = [];
    }


    removeUnavailable() {
        for (let i=0;i<this.goods.length;i++) {
            if (this.goods[i]['available'] == false) {
                this.goods.splice(i,1);
            }
        }
        return this.goods;
    }

    get totalAmount() {
        const total=this.goods.reduce(
            (accumulator,currentValue) => accumulator + currentValue['price']*currentValue['amount'],0
        );
        return `Общая сумма ${total}`
    }



    get totalSum() {
        let items =0;
        this.goods.forEach(elem => items += elem['amount']);
        return `Общее кол-во ${items} `
    }

 }


 //ПРОВЕРКА класса корзины 
 const newBasket = new Basket();
 newBasket.add(b1,10)
 newBasket.add(b2,15)

 newBasket.remove(b1,9)
 newBasket.remove(b1,1)

 //newBasket.clear()

 newBasket.removeUnavailable()

 console.log(newBasket.totalAmount)
 console.log(newBasket.totalSum)

