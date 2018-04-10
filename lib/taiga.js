const request = require('request-promise')

const token = process.env.TAIGA_TOKEN || null
const baseUrl = process.env.TAIGA_URL || null

if (token === null) {
  throw Error('TAIGA_TOKEN undefined')
}

if (baseUrl === null) {
  throw Error('TAIGA_URL undefined')
}

module.exports = () => {
  const options = {
    json: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-paginated': 'false',
      'Accept': 'application/json'
    }
  }

  const myUserInfos = Object.assign({ uri: `${baseUrl}/api/v1/users/me` }, options)
  const projectsWith = (me) => Object.assign({ uri: `${baseUrl}/api/v1/projects?member=${me.id}` }, options)
  const openUserStoriesFor = (project) => Object.assign({ uri: `${baseUrl}/api/v1/userstories?project=${project.id}&status__is_closed=false` }, options)
  const openTasksFor = (story) => Object.assign({ uri: `${baseUrl}/api/v1/tasks?user_story=${story.id}&status__is_closed=false` }, options)

  const data = {}

  return new Promise((resolve, reject) => {
    request(myUserInfos)
      .then(me => request(projectsWith(me))
        .then(projects => Promise.all(projects
          .map(project => {
            data[project.name] = {
              url: `${baseUrl}/project/${project.slug}`,
              stories: {}
            }

            const stories = data[project.name]['stories']

            return request(openUserStoriesFor(project))
              .then(userstories => Promise.all(userstories
                .map(story => {
                  stories[story.subject] = {
                    url: `${data[project.name].url}/us/${story.ref}`,
                    tasks: {}
                  }

                  return request(openTasksFor(story))
                    .then(tasks => Promise.all(tasks
                      .filter(task => task.assigned_to === me.id)
                      .map(task => {
                        stories[story.subject]['tasks'][task.subject] = {
                          url: `${data[project.name].url}/task/${task.ref}`
                        }
                      })))

                    .then(() => {
                      // delete story if it neither contains tasks for me nor is assigned to me
                      if (stories[story.subject] &&
                          Object.keys(stories[story.subject]['tasks']).length === 0 &&
                          story.assigned_to !== me.id
                      ) {
                        delete stories[story.subject]
                      }

                      // delete task property if empty
                      if (stories[story.subject] &&
                          Object.keys(stories[story.subject]['tasks']).length === 0
                      ) {
                        delete stories[story.subject]['tasks']
                      }

                      return Promise.resolve()
                    })
                })))

              .then(() => {
                if (Object.keys(data[project.name]['stories']).length === 0) {
                  delete data[project.name]
                }

                return Promise.resolve()
              })
          }))))

      .then(() => resolve(data))
  })
}
