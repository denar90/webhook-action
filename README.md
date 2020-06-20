# Webhook Action for Node env

## Usage

```yml
name: Lighthouse CI
on:
  ['push']
jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      # Actions start
      - name: Audit URLs using Lighthouse
        id: LHCIAction
        uses: treosh/lighthouse-ci-action@v3
        with:
          urls: |
            https://example.com
          uploadArtifacts: true # save results as an action artifacts
          temporaryPublicStorage: true # upload lighthouse report to the temporary storage
      # Eny other action you need to run 
      # ...
      # Actions end
      - name: Webhook
        uses: denar90/webhook-action@master
        env:
          webhookUrl: ${{secrets.ACTION_WEBHOOK_URL}}
          data: '{ "gihub": ${{ toJSON(github) }}, "links": ${{steps.LHCIAction.outputs.links}} }'
```
