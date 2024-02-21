const jwt = require('jsonwebtoken');
const jwtSecretKey="abcd$123@1"

const fetchuser=(req,res,next)=>{
    const token= req.header("auth-token");
     if (!token) {
         return res.status(401).send({error:"Please Enter a valid Authentication Token."}); 
     }
     else{
        try{
            const data=jwt.verify(token,jwtSecretKey);
             req.user=data.user;
           next();
       }
       catch(error){
         return res.status(401).send({error:"Please Enter a valid Authentication Token."}); 
       }
   }    
}

module.exports = fetchuser;