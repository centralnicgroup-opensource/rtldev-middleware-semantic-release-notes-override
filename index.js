import resolveConfig from './lib/resolve-config.js'
import getError from './lib/get-error.js'
import AggregateError from 'aggregate-error'

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

/**
 * Generates cleaned release notes by removing links and commit ids.
 * 
 * @async
 * @function generateNotes
 * @param {Object} pluginConfig - Configuration object for the plugin.
 * @param {Object} context - Context object for the plugin.
 * @returns {string} cleanedNotes - Cleaned release notes with links and commit ids removed.
 */
async function generateNotes(pluginConfig, context) {
    // Resolve plugin configuration.
    const cfg = resolveConfig(context);

    // Get the notes from the configuration object.
    const notes = cfg.notes;

    // Decode the notes to handle any special characters.
    let cleanedNotes = decodeURIComponent(notes);

    // Define the regex to match links and commit ids in the notes.
    const regex = /\(\[([^[\]]*)\]\([^()]*\)\)|\[([^[\]]*)\]\([^()]*\)/ig;

    // Replace the links and commit ids with the text in the square brackets.
    cleanedNotes = cleanedNotes.replace(regex, "$2");

    // Return the cleaned release notes.
    return cleanedNotes;
}

export default { verifyConditions, generateNotes }