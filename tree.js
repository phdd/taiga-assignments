const con***REMOVED***g = require('./lib/con***REMOVED***g')
const taiga = require('./lib/taiga')
const treeFor = require('terminal-tree')

taiga(con***REMOVED***g.baseUrl, con***REMOVED***g.token)
  .***REMOVED***((data) => {
    console.log(treeFor(data, {
      symbol: false,
      highlight: false,
      padding: 1
    ***REMOVED***))
  ***REMOVED***)
