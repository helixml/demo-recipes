#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

export IMAGE=${IMAGE:="europe-docker.pkg.dev/helixml/helix/controlplane:latest"}
export OPENAI_API_KEY=${OPENAI_API_KEY:=""}

if [[ -z $OPENAI_API_KEY ]]; then
  echo "OPENAI_API_KEY is empty. Exiting..." >&2
  exit 1
fi

docker run -t --rm \
  --entrypoint "/helix" \
  -e PORT=8080 \
  -e OPENAI_API_KEY \
  -e REPO_DIR=/repo \
  -p 8005:8080 \
  -v $PWD:/repo \
  $IMAGE gptscript
