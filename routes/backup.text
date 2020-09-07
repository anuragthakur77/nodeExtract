var express = require('express');
var cors =require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
//const htmlParse = require('node-html-parser');

var router =express.Router();
const app = express();
app.use(cors({origin: '*'}));
 
var links={links:[]};
let index=0;


router.get("/",function(req,res,next) {
    axios.get(req.query.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' }  })
    .then(response=>{
        const $ = cheerio.load(response.data);
        console.log(req.query.url);

        getUrls=(url)=>{
            axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' }  })
            .then(response=>{
                const $ = cheerio.load(response.data);
                $("a").each(function(i, elem) {
                    ($(this).attr("href") && $(this).attr("href").indexOf('http')!=0)? data="https://flipkart.com"+$(this).attr("href"): data=$(this).attr("href");
                if(links.links.indexOf(data) === -1) {
                        links.links.push(data);
                    }
                });
                if(index <= 50){
                    console.log(index);
                    console.log(links.links[index]);
                    getUrls(links.links[index]);
                    index++;
                }
                else{
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.send(links);
                }
            }).catch(err => {
                // what now?
                console.log(err);
                if(index <= 50){
                    console.log(index);
                    console.log(links.links[index]);
                    getUrls(links.links[index]);
                    index++;
                }
                else{
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.send(links);
                }  
            })
        };

        if((req.query.url.indexOf('/pr?'))>1){
            var elements={"elements":[]};
            $('a').each(function(i, elem) {           
                if ( $(this).attr('title') && $(this).attr('href').indexOf('=browse')>10){
                    var data={
                        title:$(this).attr('title'),
                        link:"https://www.flipkart.com"+$(this).attr('href')
                    }
                elements["elements"].push(data);
                }
            });
            console.log(elements.elements.length);
            if(elements.elements.length < 1){
                $('#container > div > div> div> div > div > div> div > div > div > a > div > div.col-7-12 > div._3wU53n').each(function(i, elem) {           
                        var data={
                            title:$(this).text(),
                            link:"https://www.flipkart.com"+$('#container > div > div > div > div > div > div > div > div > div > a').attr('href')
                        }
                    elements["elements"].push(data);
                });
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(elements);
        }
        else if((req.query.url.indexOf('/p/'))>1){
            var elements={"product":[]};
            var highlights=[];
            var size=[];
            var color=[];


            $("#container > div > div._3Z5yZS.NDB7oB._12iFZG._3PG6Wd > div.ooJZfD._3FGKd2 > div.ooJZfD._2oZ8XT.col-8-12 > div > div:nth-child(1) > div > div._3WHvuP > ul > li").each(function(i, elem) {
                highlights.push($(this).text());
            });
            $("#container > div > div> div > div > div > div > div> div > ul > li").each(function(i, elem) {
                let found=$(this).attr('id');
                //console.log(typeof found);
                if (typeof(found) == 'string' && found.indexOf("color")>0){ 
                    console.log($(this).text());
                    color.push($(this).text())
                }
                if (typeof(found) == 'string' && found.indexOf("size")>0){ 
                    console.log($(this).text());
                    size.push($(this).text())
                }
            });
                    var data={
                        title:$('#container > div > div._3Z5yZS.NDB7oB._12iFZG._3PG6Wd > div.ooJZfD._3FGKd2 > div.ooJZfD._2oZ8XT.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span').text(),
                        rating:$("#container > div > div > div > div > div > div > div > div > div > span._38sUEc").text(),
                        price:$("#container > div > div._3Z5yZS.NDB7oB._12iFZG._3PG6Wd > div.ooJZfD._3FGKd2 > div.ooJZfD._2oZ8XT.col-8-12 > div:nth-child(2) > div > div._3iZgFn > div._2i1QSc > div > div:nth-child(1)").text(),
                        highlights:highlights,
                        size:size,
                        color:color,
                        image:$("#container > div > div._3Z5yZS.NDB7oB._12iFZG._3PG6Wd > div.ooJZfD._3FGKd2 > div.ooJZfD._2oZ8XT.col-5-12._2GJ0F- > div:nth-child(1) > div > div._2uAjEK > div._2rDnao > div._1ov7-N > div:nth-child(2)").attr('src')
                    }
                elements["product"].push(data);
                console.log(elements);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(elements);
        }
        else if(req.query.url== "https://flipkart.com/" || req.query.url== "https://www.flipkart.com/" || req.query.url== "https://www.flipkart.com" || req.query.url== "https://flipkart.com"){
            
            let links=getUrls(req.query.url);
        }
        else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send("not a pr/p/home  page");
        }
    })
    .catch(error=> console.log(error));
    });
    
    // res.setHeader('Access-Control-Allow-Methods', 'GET'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

module.exports=router;