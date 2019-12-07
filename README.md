# Release Notifier action

This action identifies the drafted release of a repository and send a slack notification to remind about publishing the release.

## Inputs

### `repo-token`

**Required** - GITHUB Token to fetch releases

Just assign the workflow step with repo-token as `secrets.GITHUB_TOKEN`.

Example: 
```yml
with: 
  repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## Outputs

### `success`

Flag to represent the status of message sent to slack channel

## Example usage

```yml
uses: actions/release-notifier
with: 
  repo-token: ${{ secrets.GITHUB_TOKEN}}
```