const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function which gets placed between HTTP calls to check if the user is authenticated
//used only for protected routes!

module.exports = function(req,res,next){
    //get token out of the header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try{
    const decoded = jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded.payload.user;

    next();
        
    }catch(error){
        res.status(401).json({msg: 'Token is not valid'});
    }
}
