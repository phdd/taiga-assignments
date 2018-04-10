const fetchAssignments = require('./lib/taiga')
const treeFor = require('terminal-tree')
const colored = require('chalk')

fetchAssignments()
  .then((projects) => {
    console.log(treeFor(projects, {
      symbol: false,
      highlight: true,
      padding: 1,
      colors: {
        key: colored.white
      }
    }))
  })
