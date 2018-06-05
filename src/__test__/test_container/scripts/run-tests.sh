#!/usr/bin/env bash

#This script is for running the tests for the environment defined in test-runner.yml
#The environment variables used in this script are defined test-runner.env

cd $PROJ_DIR
npm install
rm $AUDIO_LIB
cp $AUDIO_SCRIPT $AUDIO_LIB
npm run coverage
