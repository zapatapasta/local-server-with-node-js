const productmodel = require("../model/product.model");

async function get(req,res){
    try{
        const products= await productmodel.find();
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.write(JSON.stringify(products));
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function getById(req,res){
    try{
        //const [,,,id] = req.url.split("/");
        const id= req.url.split("/")[3];
        const product= await productmodel.findById(id);
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.write(JSON.stringify(product));
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function creat(req,res){
    try{
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',async ()=>{
            const product ={ id:`${Date.now()}`,...JSON.parse(body)}
            const result =await productmodel.creat(product);
            res.writeHead(201,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        })
    }catch(error){
        console.log(error);
    }
}

async function update(req,res){
    try{
        let body='';
        const id = req.url.split("/")[3];
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',async ()=>{
            const parsb ={...JSON.parse(body)}
            const product =await productmodel.findById(id);
            if(!product){
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    message: "Not Found any Product"
                }))
                res.end()
            }else{
                
                const result =await productmodel.update(id,parsb);
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.write(JSON.stringify(result));
                res.end();
            }
        })
    }catch(error){
        console.log(error);
    }
}

async function remove(req,res){
    try{
        //const [,,,id] = req.url.split("/");
        const id= req.url.split("/")[3];
        const product= await productmodel.findById(id);
        if(!product){
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify({
                message: "Not Found any Product"
            }))
            res.end()
        }else{
            const result=await productmodel.remove(id);
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        }
    }catch(error){
        console.log(error);
    }
}

const productcontroller = {
    get,
    getById,
    creat,
    update,
    remove
}   
module.exports= productcontroller;