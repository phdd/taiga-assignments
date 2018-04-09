const request = require('request-promise')

module.exports = (baseUrl, token) => {
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
                  stories[story.subject] = []

                  return request(openTasksFor(story))
                    .then(tasks => Promise.all(tasks
                      .filter(task => task.assigned_to === me.id)
                      .map(task =>
                        stories[story.subject].push(task.subject)
                      )))

                    .then(() => {
                      // delete story if it neither contains tasks for me nor is assigned to me
                      if (stories[story.subject] &&
                          stories[story.subject].length === 0 &&
                          story.assigned_to !== me.id
                      ) {
                        delete stories[story.subject]
                      }

                      return Promise.resolve()
                    })
                })))

              .then(() => {
                if (Object.keys(data[project.name]).length === 0) {
                  delete data[project.name]
                }

                return Promise.resolve()
              })
          }))))

      .then(() => resolve(data))
  })
}
