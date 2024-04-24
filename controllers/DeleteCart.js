const DeleteCart = async(req , res) => {
    try{
        console.log(req.params) ;
        const {id} = req.params ;
        req.user.carts = req.user.carts.filter((item)=>item._id!=id);
        req.user.save();
        res.status(201).json(req.user);
        console.log("deleted successfully");
    }
    catch(err){
        res.json(401).json({msg : "Error in deleting" + err});
    }
}

export default DeleteCart
