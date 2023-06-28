const { log } = require("console");
const products = require("../data/products.json");
const fs=require("fs");
async function find(){
    return new Promise((resolve,reject)=>{
        resolve(products);
    })
}

async function findById(id){
    return new Promise((resolve,reject)=>{
        resolve(products.find(product => product.id == id));
    })
}
async function creat(product){
    return new Promise((resolve,reject)=>{
        products.push(product);
        fs.writeFile(`${process.cwd()}/data/products.json`,JSON.stringify(products),(err)=>{
            if(err)reject(err);
            else resolve({message:"new product added" , data:product})
        })
    })
}

async function update(id,payload){
    return new Promise((resolve,reject)=>{
        products.map(product => {
            if(product.id == id){
                Object.assign(product,payload);
            }
            return product;
        })
        fs.writeFile(`${process.cwd()}/data/products.json`,JSON.stringify(products),(err)=>{
            if(err)reject(err);
            else resolve({message:"product updated"})
        })
    })
}

async function remove(id){
    return new Promise((resolve,reject)=>{
        const newlist=products.filter(product=>product.id !== id);
        fs.writeFile(`${process.cwd()}/data/products.json`,JSON.stringify(newlist),(err)=>{
            if(err)reject(err);
            else resolve({message:"product deleted"})
        })
    })
}

const productmodel ={
    find,
    findById,
    creat,
    update,
    remove
}

module.exports=productmodel;