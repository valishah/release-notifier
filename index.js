const core = require('@actions/core');
const github = require('@actions/github');

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
    const repository_name = repository && repository.name;
    const owner =  repository && repository.owner.name;
    console.log(`Repository: ${repository_name}`);
    console.log(`Owner ${owner}`);
    console.log('===== Context ========');
    console.log(JSON.stringify(context));

    // const octokit = new github.GitHub(token);
    // const data = await octokit.repos.listReleases({
    //     owner: 'valishah',
    //     repo: 'release-notifier',
    //     pull_number: 123,
    //     mediaType: {
    //       format: 'diff'
    //     }
    // });

} catch (error) {
    core.setFailed(error.message);
}