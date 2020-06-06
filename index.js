const core = require('@actions/core');
const { post } = require('got');

async function main() {
    const webhookUrl = core.getInput('webhookUrl');
    const data = core.getInput('data');

    if (!webhookUrl) {
        throw new Error('webhookUrl is required');
    }

    return post(webhookUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        json: { data },
        responseType: 'json'
    });
}

return main()
    .catch((err) => core.setFailed(err.message))
    .then(() => core.debug(`done in ${process.uptime()}s`))