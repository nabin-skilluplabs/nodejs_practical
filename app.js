import { parse } from 'node-html-parser';
import fs from 'fs';

const url = "https://www.seek.com.au/ai-engineer-jobs/in-Sydney-NSW-2000";

async function writeToFile(data) {
    console.log('Writing data to file...');
    fs.writeFileSync('tmp.html', data);
    console.log('Done')
}

function writeDataToCSV(data) {
    let csvData = 'Job Title, Company, Job Details\n';
    data.forEach(item => {
        csvData += `${item.jobTitle},${item.company},${item.details}\n`;
    });
    console.log('Writing data to CSV...');
    fs.writeFileSync('jobs.csv', csvData);
    console.log('Done')
}


async function getFilteredJobListing(url) {
    const response =  await fetch(url);
    const htmlBody = await response.text();
    const document = parse(htmlBody);
    const list = document.querySelectorAll(".gepq850.eihuid5b.eihuidhf.eihuid6v");
    list.splice(0, 3);
    writeToFile(list.toString());

    let jobListingArray =  list.map(item => {
        let jobTitle = item.querySelector("[data-testid='job-card-title']");
        let company = item.querySelector("a[data-type='company']");
        let details = item.querySelector("[data-testid='job-card-teaser']");
      
        return {
            jobTitle: jobTitle?.text,
            company: company?.text,
            details: details?.text
        }
    });

    let filteredJobListing = jobListingArray.filter(job => job.jobTitle && job.company && job.details);
    return filteredJobListing;
}

async function getUrlContent() {
    let dataExists = true;
    let page = 1;
    let allJobListing = [];
    while(dataExists) {
        let requestUrl =  `${url}?page=${page}`;
        let filteredJobListing = await getFilteredJobListing(requestUrl);
        if(filteredJobListing && (filteredJobListing.length > 0)) {
            page++;
            allJobListing = [...allJobListing, ...filteredJobListing];
        }
        else {
            dataExists = false;
        }
    }

    writeDataToCSV(allJobListing);
}


getUrlContent();