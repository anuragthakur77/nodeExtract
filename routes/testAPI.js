var express = require('express');
var cors =require('cors');

var router =express.Router();
 
const app = express();
app.use(cors({origin: '*'}));

router.get("/",function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send("API working fine!")
})

module.exports=router;