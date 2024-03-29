const core = require('@actions/core');
const github = require('@actions/github');
const sendMessage = require('./src/post-message');

const fetchReleases = async (request) => {
    const octokit = new github.GitHub(request.token);
    const releases = await octokit.repos.listReleases({
        owner: request.owner_name,
        repo: request.repository_name,
        per_page: 1,
    });
   return releases? releases.data: [];
};

const isDraftRelease = (releases) => {
    if(!releases || !releases.length) return false;
    return releases[0].draft;
}


const processAction = async () => {
    try {
        const token = core.getInput('repo-token');
        const slack_token = core.getInput('slack-bot-token');
        const slack_message = core.getInput('slack-message');
        /* const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`); */
        const repository = github.context.payload.repository;
        const repository_name = repository.name;
        const owner_name =  repository.owner.name;
       /*  console.log(`Repository: ${repository_name}`);
        console.log(`Owner ${owner_name}`); */
        const releases = await fetchReleases({
            token,
            repository_name,
            owner_name
        });
        console.log('============ Releases =========');
        console.log(`${JSON.stringify(releases)}`);

        if(!isDraftRelease(releases)){
            console.log('No draft release found to execute slack notification');
        }

        console.log(`Slack Token: ${slack_token}`);
        console.log('==== Slack Message ===');
        console.log(slack_message);

        const response = await sendMessage(slack_token, JSON.parse(slack_message));
        console.log(' =========== RESULT =========');
        console.log(response);
        core.setOutput('slack-response', response);
    
    } catch (error) {
        core.setFailed(error.message);
    }
}

processAction();

