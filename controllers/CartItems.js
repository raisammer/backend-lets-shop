
const CartItems = async(req ,res)=>{
    try{
        const user = req.user ;
        res.status(201).json(user);
    }
    catch(err){
        console.log("Error : "+err);
        res.status(401).json({msg : "Error "+err});
    }
}

export {CartItems};