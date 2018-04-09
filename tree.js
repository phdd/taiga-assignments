const config = require('./lib/config')
const taiga = require('./lib/taiga')
const treeFor = require('terminal-tree')

taiga(config.baseUrl, config.token)
  .then((data) => {
    console.log(treeFor(data, {
      symbol: false,
      highlight: false,
      padding: 1
    }))
  })
