# Webhook Action for Node env

Yet another webhook action but for node env. Sends webhook `POST` request to API.

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
        uses: denar90/webhook-action@0.1.0
        with:
          webhookUrl: ${{secrets.ACTION_WEBHOOK_URL}}
          # or just public URL, not suggested
          # webhookUrl: https://api.my-service.app/github-webhook
          data: '{ "github": ${{ toJSON(github) }}, "links": ${{steps.LHCIAction.outputs.links}} }'
```


### TBD:
- add param to scpecity request type, currently supported only `POST`
- tell me if you need more stuff :) 

## License - MIT
