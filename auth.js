const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken : (req,res,next)=>{
        let token = req.get("authorization")
        if(token){
            //console.log(token);
            token=token.slice(7);
            //console.log(token);
            verify(token,process.env.KEY,(err,decoded)=>{
                if(err){
                    res.json({
                        status : 0,
                        message: "Invalid Token"
                    })
                }
                else{
                    next();
                }
            })
        }
        else{
            res.json({
                status : 0,
                message : "Access Denied, Please check the Authentication token"
            })
        }
    }
}