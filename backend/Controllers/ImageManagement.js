const multer = require('multer');
const storage = multer.diskStorage({
    
  destination: function (req,file,cb) {
      cb(null,'./backend/uploads/');
    },
    filename : function(req,file,cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
      console.log('uploading image:',file.originalname);
    }
  })

  const upload = multer({storage:storage})
  

module.exports = upload;