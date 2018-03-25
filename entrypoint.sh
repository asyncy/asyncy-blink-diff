#!/bin/sh
set -e

if [ "$1" = "one" ]; then
  node diff_one.js $@
else
  node diff_many.js $@
fi
