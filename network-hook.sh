#!/bin/bash

function syncTaigaWithTodoist {
  cd /home/peter/Dokumente/Repositories/Taiga-Assignments

  export TODOIST_TOKEN="303d7d39d8f7302cf4676ddeb1466b45b677104f"
  export TAIGA_TOKEN="29d5a940-5a9b-11e8-b7a3-02420a000209"
  export TAIGA_URL="https://task.inf.tu-dresden.de"

  echo "Sync taiga with todoist"
  node sync.js 2>&1 | logger -t taiga-todoist-sync

  logger -t taiga-todoist-sync "Added Taiga assignments to Todoist"
}

IF=$1
STATUS=$2

if [ "$IF" == "enp0s25" ] || [ "$IF" == "wlp3s0" ]
then
    case "$2" in
        up)
          syncTaigaWithTodoist
        ;;

        down)
        ;;

        pre-up)
        ;;

        post-down)
        ;;

        *)
        ;;
    esac
fi
