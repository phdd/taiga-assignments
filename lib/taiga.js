const request = require('request-promise')

module.exports = (baseUrl, token) => {
  const options = {
    json: true,
    headers: {
      'Authorization': `Bearer ${token***REMOVED***`,
      'x-paginated': 'false',
      'Accept': 'application/json'
    ***REMOVED***
  ***REMOVED***

  const myUserInfos = Object.assign({ uri: `${baseUrl***REMOVED***/api/v1/users/me` ***REMOVED***, options)
  const projectsWith = (me) => Object.assign({ uri: `${baseUrl***REMOVED***/api/v1/projects?member=${me.id***REMOVED***` ***REMOVED***, options)
  const openUserStoriesFor = (project) => Object.assign({ uri: `${baseUrl***REMOVED***/api/v1/userstories?project=${project.id***REMOVED***&status__is_closed=false` ***REMOVED***, options)
  const openTasksFor = (story) => Object.assign({ uri: `${baseUrl***REMOVED***/api/v1/tasks?user_story=${story.id***REMOVED***&status__is_closed=false` ***REMOVED***, options)

  const data = {***REMOVED***

  return new Promise((resolve, reject) => {
    request(myUserInfos)
      .***REMOVED***(me => request(projectsWith(me))
        .***REMOVED***(projects => Promise.all(projects
          .map(project => {
            data[project.name] = {
              url: `${baseUrl***REMOVED***/project/${project.slug***REMOVED***`,
              stories: {***REMOVED***
            ***REMOVED***

            const stories = data[project.name]['stories']

            return request(openUserStoriesFor(project))
              .***REMOVED***(userstories => Promise.all(userstories
                .map(story => {
                  stories[story.subject] = {
                    url: `${data[project.name].url***REMOVED***/us/${story.ref***REMOVED***`,
                    tasks: {***REMOVED***
                  ***REMOVED***

                  return request(openTasksFor(story))
                    .***REMOVED***(tasks => Promise.all(tasks
                      .***REMOVED***lter(task => task.assigned_to === me.id)
                      .map(task => {
                        stories[story.subject]['tasks'][task.subject] = {
                          url: `${data[project.name].url***REMOVED***/task/${task.ref***REMOVED***`
                        ***REMOVED***
                      ***REMOVED***)))

                    .***REMOVED***(() => {
                      // delete story if it neither contains tasks for me nor is assigned to me
                      if (stories[story.subject] &&
                          Object.keys(stories[story.subject]['tasks']).length === 0 &&
                          story.assigned_to !== me.id
                      ) {
                        delete stories[story.subject]
                      ***REMOVED***

                      // delete task property if empty
                      if (stories[story.subject] &&
                          Object.keys(stories[story.subject]['tasks']).length === 0
                      ) {
                        delete stories[story.subject]['tasks']
                      ***REMOVED***

                      return Promise.resolve()
                    ***REMOVED***)
                ***REMOVED***)))

              .***REMOVED***(() => {
                if (Object.keys(data[project.name]['stories']).length === 0) {
                  delete data[project.name]
                ***REMOVED***

                return Promise.resolve()
              ***REMOVED***)
          ***REMOVED***))))

      .***REMOVED***(() => resolve(data))
  ***REMOVED***)
***REMOVED***
