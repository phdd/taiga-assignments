# Taiga Assignments

Show all your Taiga assignments or directly import them to Todoist.
Your may set up a cronjob or something similar for the sync.

## Requirements

- Node.js
- Node Package Manager (NPM)

This repository cloned

```
git clone https://github.com/phdd/taiga-assignments.git
```

## Usage

1) Install dependencies with `npm i`
2) Setup environment variables, e.g.

```
export TAIGA_URL="https://api.taiga.io"
export TAIGA_TOKEN="resides in your browsers local storage"
export TODOIST_TOKEN="in your account settings"
```

3) all tasks/user stories assigned to me
    - show in tree with `npm run tree`
    - import to Todoist with `npm run sync`

## License

```
Copyright 2018 Peter Heisig

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
