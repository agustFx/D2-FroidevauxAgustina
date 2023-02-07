const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path = path
    }

    addProduct({id, title, description, price, thumbnail, code, stock}){
        const products = []

        const product = new Product(id, title, description, price, thumbnail, code, stock)
        products.push(product)

        const productsJson = JSON.stringify(products)

        fs.promises.writeFile('products.json', productsJson)
    }

    async getProducts(){
        const returnProducs = await fs.promises.readFile(this.path, 'utf-8')
        console.log(returnProducs)
    }

    getProductById(id){
        const product = this.products.find(e => e.id === id)
        
        if(product?.id == undefined || false){
            throw new Error('No se encontró id del producto')
        }
    }

    updateProducts(){
        try{
            fs.promises.appendFile(this.path, this.addProduct(id, title, description, price, thumbnail, code, stock))
        } catch(error){
            console.log(error.message);
        }
    }

    deleteProducts(){
        try{
            fs.promises.rm(this.path)
        } catch(error){
            console.log(error.message);
        }
    }
}

class Product{
    constructor(id, title, description, price, thumbnail, code, stock = false){
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

        if(id == undefined){
            throw new Error('ID ES UN CAMPO OBLIGATORIO')
        }
        if(title == undefined){
            throw new Error('TITLE ES UN CAMPO OBLIGATORIO')
        }
        if(description == undefined){
            throw new Error('DESCRIPTION ES UN CAMPO OBLIGATORIO')
        }
        if(price == undefined){
            throw new Error('PRICE ES UN CAMPO OBLIGATORIO')
        }
        if(thumbnail == undefined){
            throw new Error('THUMBNAIL ES UN CAMPO OBLIGATORIO')
        }
        if(code == undefined){
            throw new Error('CODE ES UN CAMPO OBLIGATORIO')
        }
        if(stock == undefined){
            throw new Error('STOCK ES UN CAMPO OBLIGATORIO')
        }

    }
}

const productManager = new ProductManager('./products.json')
productManager.addProduct({id: '4', title: 'Producto 4', description: 'Este es un producto y es el número 4', price: 240, thumbnail: '', code: 150, stock: '10'})
productManager.updateProducts({id: '3', title: 'Producto 3', description: 'Este es un producto y es el número 3', price: 230, thumbnail: '', code: 250, stock: '40'})
productManager.getProducts()
productManager.deleteProducts()




