// multerMiddleware

const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./uploads")
    },
    filename:function (req,file,cb){
  
        // const date = new Date().toISOString().replace(/:/g, "-"); // Format date as string without colons
        const date = Date.now();
        const filename = `${date}-${file.originalname}`;
        cb(null,filename)
    }
});


const upload = multer({
    storage:storage,
  
});

module.exports = upload;