import User from "../models/userSchema.js"

const register = async(req , res)=>{
    try{

        const {fname , email , mobile , password , cpassword} = req.body;
        console.log(" Body se aane wala " , req.body);
        const previousUser = await User.findOne({email: email});
        console.log("Nhi mila " , previousUser);
        if(!fname || !email || !mobile || !password || !cpassword){
            return res.status(422).json({msg: "All details are not filled "});
        }
        if(previousUser){
            return res.status(422).json({msg : "User already exists"});
        }
        if(password !== cpassword){
           return res.status(422).json({msg:"Passwords are not same"});
        }
         const user = new User ({
            fname, email , mobile , password , cpassword
         })
        console.log( ' User toh aa raha hh ' , user);
        const storedUser = await user.save();
        console.log(storedUser);
        res.status(201).json(storedUser);
    }
    catch(err){
        res.status(422).json({msg:`error in storing the user : ${err}`})
    }
}

export {register} 