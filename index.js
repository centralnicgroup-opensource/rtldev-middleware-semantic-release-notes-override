const resolveConfig = require('./lib/resolve-config')
const getError = require('./lib/get-error')
const AggregateError = require('aggregate-error')

let verified;
async function verifyConditions(pluginConfig, context) {
    if (!verified) {
        const cfg = resolveConfig(context);
        const errors = []

        // TODO: we might test Marketplace login using given credentials
        if (cfg.notes === false) {
            errors.push(getError('ReleaseNotesNotFound'))
        }
        if (errors.length > 0) {
            throw new AggregateError(errors)
        }
        verified = true
    }
}

async function generateNotes(pluginConfig, context){
    const cfg = resolveConfig(context);
    const cleanedNotes = cfg.notes.replace(/\(\[([^[\]]*)\]\([^()]*\)\)/gm, "");
    return cleanedNotes;
}

module.exports = {verifyConditions, generateNotes}