import { parse } from 'node-html-parser';

const url = "https://www.seek.com.au/full-stack-developer-jobs/in-Sydney-NSW-2000";

async function getUrlContent() {
    const response =  await fetch(url);
    const htmlBody = await response.text();
    const document = parse(htmlBody);
    console.log({document});
    const list = document.querySelector(".eihuid6v")
    
}


getUrlContent();