#!/bin/bash

export TEBACKEND=$TRAVIS_BUILD_DIR/../tE-backend
export WORKSPACE=$TRAVIS_BUILD_DIR
env | grep TEBACKEND
env | grep WORKSPACE
mkdir $TEBACKEND
git pull https://github.com/WycliffeAssociates/tE-backend.git $TEBACKEND
cd src/__test__/test_container
