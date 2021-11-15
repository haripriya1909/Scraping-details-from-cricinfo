const request=require("request");
const cheerio=require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
request(url,cb);
console.log("before");
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        extracthtml(html);
    }
}
console.log("after");
function extracthtml(html)
{
    let $=cheerio.load(html);
    let elearr=$(".match-comment  .match-comment-wrapper .match-comment-long-text p ");
    let lastcomm=$(elearr[0]).text();
    let htmldata=$(elearr[0]).html();
    console.log("comment is", lastcomm);
    console.log("html data" , htmldata);
}