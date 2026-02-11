const flexboxContainer = document.getElementById("flexbox-container");
const projectsToDisplay = [
    {
        repoName: "data_de-identification",
        projectTitle: "Data De-Identification",
        projectDescription: "This project provides a set of self-contained SQL Scripts designed to hide/mask senstive data in a SQL Database allowing a team to store production realistic data sets in lower environments without breaking data compliance laws because the data is hidden/maked into a different value with no way to restore it to it's previous value."
    },{
        repoName: "family-feud",
        projectTitle: "Family Feud",
        projectDescription: "This project holds a set of HTML, CSS and JavaScript files to run a simple round of the classic family game show, \"Family Feud\". Plans are to upgrade this project in the future to allow it to generate a round on demand from either a database on an API as well as track team scores. Allowing this to be used as a tool to support family game nights or similar fun events in small groups."
    },{
        repoName: "the-quote-card-express",
        projectTitle: "Quote Card",
        projectDescription: "A web page leveraging Express Node.js which pulls a random image from the Unsplash API and makes it the background for a quote."
    }
]

for (project of projectsToDisplay) {
    try {
        addProjectObjectToPage (project.repoName, project.projectTitle, project.projectDescription);
    } catch (error) {
        console.error(error);
    }
}

async function getRepoDetails(repoName) {
    let repoDetails = {};
    
    try {
        const response = await fetch(`https://api.github.com/repos/kirk-c-saunders/${repoName}`);
        const returnedData = await response.json();

        repoDetails = {
            language: returnedData.language,
            updatedAt: new Date(returnedData.updated_at)
        };
    } catch (error) {
        console.error(error);
    }

    try {
        const commitsResponse = await fetch(`https://api.github.com/repos/kirk-c-saunders/${repoName}/stats/participation`)
        const returnedCommitData = await commitsResponse.json();
        
        let sum = 0;
        for(commitCount of [...returnedCommitData.all]){
            sum += commitCount
        }
        
        repoDetails.commitCount = sum;
    } catch (error) {
        console.error(error);
    }

    return repoDetails;
}

async function addProjectObjectToPage (repoName, projectTitle, projectDescription){    
    try {
        /* Get Repo Details from GitHub API*/
        const repoDetails = await getRepoDetails(repoName);
        
        /* Create HTML Objects */
        const sectionContainer = document.createElement("section");
        sectionContainer.classList.add("section");

        const h2 = document.createElement("h2");
        
        const h2AnchoredText = document.createElement("a");
        h2AnchoredText.href = `https://github.com/kirk-c-saunders/${repoName}`;
        h2AnchoredText.innerText = projectTitle;

        const projectDescriptionParagraph = document.createElement("p");
        projectDescriptionParagraph.innerText = projectDescription;

        const firstLineBreak = document.createElement("br");
        const horizontalBar = document.createElement("hr");
        const secondLineBreak = document.createElement("br");
        const h3 = document.createElement("h3");
        h3.innerText = "GitHub Repo Details:";

        const repoDetailsUnorderedList = document.createElement("ul");
        const languagesListItem = document.createElement("li");
        const lastUpdatedDateTimeListItem = document.createElement("li");
        const commitCountListItem = document.createElement("li");

        languagesListItem.innerText = `Language(s): ${repoDetails.language}`;
        lastUpdatedDateTimeListItem.innerText = `Last Updated: ${repoDetails.updatedAt.toLocaleString()}`;
        commitCountListItem.innerText = `Total number of commits: ${repoDetails.commitCount}`;

        /* Start assembling Project HTML Object from bottom up */
        repoDetailsUnorderedList.appendChild(languagesListItem);
        repoDetailsUnorderedList.appendChild(lastUpdatedDateTimeListItem);
        repoDetailsUnorderedList.appendChild(commitCountListItem);

        h2.appendChild(h2AnchoredText);

        sectionContainer.appendChild(h2);
        sectionContainer.appendChild(projectDescriptionParagraph);
        sectionContainer.appendChild(firstLineBreak);
        sectionContainer.appendChild(horizontalBar);
        sectionContainer.appendChild(secondLineBreak);
        sectionContainer.appendChild(h3);
        sectionContainer.appendChild(repoDetailsUnorderedList);

        flexboxContainer.appendChild(sectionContainer);
    } catch (error) {
        console.error(error);
    }
}