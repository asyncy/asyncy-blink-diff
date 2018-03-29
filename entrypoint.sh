#!/bin/sh
set -e

if [ "$1" = "one" ]; then
  mkdir -p $(basename $4)
  node diff_one.js $@
else
  mkdir -p $4
  node diff_many.js $@
fi
