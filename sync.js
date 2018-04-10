const todoist = require('./lib/todoist')
const fetchAssignments = require('./lib/taiga')

const addTaskTo = async (project, text, url) => {
  const isNotReferingToUrl = (note) => !note.content.endsWith(url)
  const noReferencesFound = todoist.state.notes.every(isNotReferingToUrl)

  if (noReferencesFound) {
    const task = todoist.items.add(text, project.id)
    todoist.notes.add(task.id, `See ${url}`)
    todoist.commit()
    console.log(`task '${text}' created`)
  }
}

Promise
  .all([
    todoist.sync(),
    fetchAssignments()
  ])

  .then((results) => {
    const projects = results[1]

    const inbox = todoist.state.projects.find(
      project => project.name === 'Inbox')

    for (const projectName in projects) {
      const project = projects[projectName]

      for (const storyName in project.stories) {
        const story = project.stories[storyName]

        if (story.tasks) {
          for (const taskName in story.tasks) {
            const task = story.tasks[taskName]
            addTaskTo(inbox,
              `${projectName}: ${storyName}: ${taskName}`, task.url)
          }
        } else {
          addTaskTo(inbox,
            `${projectName}: ${storyName}`, story.url)
        }
      }
    }
  })
