const notfound =(res)=>{
    res.writeHead(404,{'Cnotent-Type':'application/json'});
    res.write(JSON.stringify({message : "route not found"}));
    res.end();
}

const errorHandler={
    notfound
}

module.exports=errorHandler;