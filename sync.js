const todoist = require('./lib/todoist')
const fetchAssignments = require('./lib/taiga')

const addTaskTo = async (project, text, url) => {
  const isNotReferingToUrl = (note) => !note.content.endsWith(url)
  const noReferencesFound = todoist.state.notes.every(isNotReferingToUrl)

  if (noReferencesFound) {
    const task = todoist.items.add(text, project.id)
    todoist.notes.add(task.id, `See ${url***REMOVED***`)
    todoist.commit()
    console.log(`task '${text***REMOVED***' created`)
  ***REMOVED***
***REMOVED***

Promise
  .all([
    todoist.sync(),
    fetchAssignments()
  ])

  .***REMOVED***((results) => {
    const projects = results[1]

    const inbox = todoist.state.projects.***REMOVED***nd(
      project => project.name === 'Inbox')

    for (const projectName in projects) {
      const project = projects[projectName]

      for (const storyName in project.stories) {
        const story = project.stories[storyName]

        if (story.tasks) {
          for (const taskName in story.tasks) {
            const task = story.tasks[taskName]
            addTaskTo(inbox,
              `${projectName***REMOVED***: ${storyName***REMOVED***: ${taskName***REMOVED***`, task.url)
          ***REMOVED***
        ***REMOVED*** else {
          addTaskTo(inbox,
            `${projectName***REMOVED***: ${storyName***REMOVED***`, story.url)
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)
