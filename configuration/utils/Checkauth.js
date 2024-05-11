const { usercollection } = require("../Model/User");

const isAuthAndActedManager = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user or please log in",
    });
  }

  const userId = req.session.userId;
  const user = await  usercollection.findById(userId);
 
   if (!user) {
     return res.status(401).json({
       success: false,
       message: "Invalid user ID",
     });
   }

   if (!user.role.includes("manager")) {
     return res.status(401).json({
       success: false,
       message: "Unauthorized role",
     });
   }

  next();
};

const isauthinactedstaff = (re,res,next) =>{
    
    const userId = req.session.userId
    if(!userId) {
         return res.status(401).json({
            success: false,
            message: "unauthorized user or please login",
          });
    }

    const user = usercollection.findbyId('userId')

    if( !user)  {
        return res.status(401).json({
            success: false,
            message: "invalid user id",
          });
    }

    if ( ! user.role.indexof('staff') ) {
        return res.status(401).json({
            success: false,
            message: "unauthorized role",
          });
    }

    next()

}



const isauthinactedstorekeeper = (re,res,next) =>{
    
    const userId = req.session.userId
    if(!userId) {
         return res.status(401).json({
            success: false,
            message: "unauthorized user or please login",
          });
    }

    const user = usercollection.findbyId('userId')

    if( !user)  {
        return res.status(401).json({
            success: false,
            message: "invalid user id",
          });
    }

    if ( ! user.role.indexof('storekeeper') ) {
        return res.status(401).json({
            success: false,
            message: "unauthorized role",
          });
    }

    next()

}


const isauthinactedadmin = (re,res,next) =>{
    
    const userId = req.session.userId
    if(!userId) {
         return res.status(401).json({
            success: false,
            message: "unauthorized user or please login",
          });
    }

    const user = usercollection.findbyId('userId')

    if( !user)  {
        return res.status(401).json({
            success: false,
            message: "invalid user id",
          });
    }

    if ( ! user.role.indexof('admin') ) {
        return res.status(401).json({
            success: false,
            message: "unauthorized role",
          });
    }

    next()

}


module.exports = {
    isAuthAndActedManager,
    isauthinactedstaff,
    isauthinactedstorekeeper,
    isauthinactedadmin

}