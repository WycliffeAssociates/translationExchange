#!/bin/bash

cd ..
export TEBACKEND=$(pwd)/tE-backend
export WORKSPACE=$TRAVIS_BUILD_DIR
env | grep TEBACKEND
env | grep WORKSPACE
mkdir $TEBACKEND
git pull https://github.com/WycliffeAssociates/tE-backend.git $TEBACKEND
