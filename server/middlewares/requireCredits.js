module.exports = (req,res,next) =>{
    //check if user signed in
    if(req.user.credits < 1){
        return res.status(403).send({error:'Not enough credits'});
    }

    next();
}