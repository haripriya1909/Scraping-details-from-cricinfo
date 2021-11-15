const request=require("request");
const cheerio=require("cheerio");

const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

request(url,cb);

function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
     extract(html);
    }
}

function extract(html)
{
    let $=cheerio.load(html);
    let temasarr=$(".match-info-MATCH .teams .team");
    let wteamname;
    for(let i=0;i< temasarr.length;i++)
    {
        let hasclass=$(temasarr[i]).hasClass("team-gray");
        if(hasclass==false)
        {
            //winning-team
         let teamname=$(temasarr[i]).find(".name");
         wteamname=teamname.text().trim();
        //  console.log(teamname.text());
        }
    }


    let teamelearr=$(".match-body .match-scorecard-table .Collapsible ");
    let teamele="";
    for(let i=0;i<teamelearr.length;i++)
    {
        // let chtlm=$(teamelearr[i]).html();
        // teamele+=chtlm;

        //team name
        let teamnameelement=$(teamelearr[i]).find(".header-title");
        let nameofteam=teamnameelement.text();
        nameofteam=nameofteam.split("INNINGS")[0];
        nameofteam=nameofteam.trim();
        // console.log(nameofteam);
        let hwtName="";
        let hw=0;
        if(wteamname==nameofteam)
        {
            console.log(nameofteam);

            let bowltable=$(teamelearr[i]).find(".table.bowler");
            let allbowlers=$(bowltable).find("tr");
            for(let j=0;j<allbowlers.length;j++)
            {
                let allcolumns=$(allbowlers[j]).find("td");
                let playername=$(allcolumns[0]).text();
                let wickets=$(allcolumns[4]).text();
                // console.log(`winning team ${wteamname} playername: ${playername} wickets: ${wickets}`);
                if(wickets>=hw)
                {
                    hw=wickets;
                    hwtName=playername;
                }
            }
        }
        console.log(hw);
        console.log(hwtName);
        //team table
    }
    // console.log(teamele); 
}
