const { clearHash } = require('../services/cache');


module.exports = async (req,res,next) => {
    console.log("third");
    await next();
    console.log("first third");
    clearHash(req.user.id);
    console.log("4th");
}