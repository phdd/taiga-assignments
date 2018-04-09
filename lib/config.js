const token = process.env.TAIGA_AUTH_TOKEN || null
const baseUrl = process.env.TAIGA_BASE_URL || null

if (token === null) {
  throw Error('TAIGA_AUTH_TOKEN unde***REMOVED***ned')
***REMOVED***

if (baseUrl === null) {
  throw Error('TAIGA_BASE_URL unde***REMOVED***ned')
***REMOVED***

module.exports = {
  token: token,
  baseUrl: baseUrl
***REMOVED***
