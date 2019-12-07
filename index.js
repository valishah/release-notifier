const core = require('@actions/core');
const github = require('@actions/github');

const fetchReleases = async (request) => {
    const octokit = new github.GitHub(request.token);
    const releases = await octokit.repos.listReleases({
        owner: request.owner_name,
        repo: request.repository_name,
        per_page: 1,
    });
    console.log('============ Releases =========');
    console.log(JSON.stringify(releases.data));
};

const processAction = () => {
    try {
        // `who-to-greet` input defined in action metadata file
        const nameToGreet = core.getInput('who-to-greet');
        const token = core.getInput('repo-token', {required: true});
        console.log(`Repo token ${token}`);
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
        const repository = github.context.payload.repository;
        const repository_name = repository.name;
        const owner_name =  repository.owner.name;
        console.log(`Repository: ${repository_name}`);
        console.log(`Owner ${owner_name}`);
        const releases = fetchReleases({
            token,
            repository_name,
            owner_name
        });
        console.log(`${JSON.stringify(releases)}`);
    
    } catch (error) {
        core.setFailed(error.message);
    }
}

processAction();

