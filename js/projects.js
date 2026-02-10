async function getRepoDetails(repoName) {
    let repoDetails = {};
    
    try {
        const response = await fetch(`https://api.github.com/repos/kirk-c-saunders/${repoName}`);
        const returnedData = await response.json();
        
        console.log(returnedData);
        
        repoDetails = {
            language: returnedData.language,
            updatedAt: returnedData.updated_at
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

    console.log(repoDetails);
}

getRepoDetails('data_de-identification');