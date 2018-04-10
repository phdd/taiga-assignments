const token = process.env.TODOIST_TOKEN || null

if (token === null) {
  throw Error('TODOIST_TOKEN unde***REMOVED***ned')
***REMOVED***

const Api = require('todoist-js').default

module.exports = new Api(token)
