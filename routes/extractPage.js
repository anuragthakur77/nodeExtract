var express = require('express');
var cors =require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
//const htmlParse = require('node-html-parser');

var router =express.Router();

const app = express();
app.use(cors({origin: '*'}));

router.get("/",function(req,res,next) {
    axios.get(req.query.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' }  })
    .then(response=>{
        const $ = cheerio.load(response.data);
        console.log(req.query.url);
        if(req.query.url== "https://flipkart.com/" || req.query.url== "https://www.flipkart.com/" || req.query.url== "https://www.flipkart.com" || req.query.url== "https://flipkart.com"){
            var links={"links":[]};
            $("a").each(function(i, elem) {

                ($(this).attr("href") && $(this).attr("href").indexOf('http')!=0)? data="https://flipkart.com"+$(this).attr("href"): data=$(this).attr("href");
            if(links.links.indexOf(data) === -1) {
                    links.links.push(data);
                }
            });
            console.log(links.links.length);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(links);
        }
    })
    });
    
    // res.setHeader('Access-Control-Allow-Methods', 'GET'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

module.exports=router;