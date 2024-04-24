
const LogOut = async(req , res) => {
    try{
        console.log("hello")
        req.user.tokens = req.user.tokens.filter((ele)=>{
            //console.log(ele);
            return ele.token !== req.token ;
        })

        res.clearCookie('LetsConnectweb' , {path:'/'})
        req.user.save() ;
        res.status(201).json(req.user);
    }
    catch(err){
        console.log("ERRor in Logging out", err);
        res.status(404).json({msg: "Error in Logging out"+ err})
    }
}

export default LogOut
