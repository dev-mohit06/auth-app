const async_wrapper = (fn) => {
    return async (req,res,next) => {
        try{
            fn(req,res,next);
        }catch(error){
            next(error);
        }
    }
}

module.exports = async_wrapper;