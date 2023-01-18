export default ({ env }) => ({
  notes: env.customReleaseNotes || false,
  debug:
    (env.DEBUG && /^semantic-release:(\*|notes-override)$/.test(env.DEBUG)) || false
});