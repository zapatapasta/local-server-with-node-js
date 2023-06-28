const http = require("http");
const products = require("./data/products.json");
const productcontroller = require("./controllers/product.controllers");
const errorHandler = require("./controllers/errorHandler.controller");
const PORT = 3000;
const server = http.createServer((req,res)=>{
    if(req.url == "/api/products" && req.method =="GET"){
      productcontroller.get(req,res);
    }else if(req.url == "/api/products" && req.method == "POST"){
        productcontroller.creat(req,res);
    }else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method =="GET"){
        productcontroller.getById(req,res);
    }
    else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method =="PUT"){
        productcontroller.update(req,res);
    }else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method =="DELETE"){
        productcontroller.remove(req,res);
    }else{ 
        errorHandler.notfound();
    }
})

server.listen(PORT);
console.log(`run server on port ${PORT} http://localhost:${PORT}/api/products`);


