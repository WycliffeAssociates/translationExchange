#!/usr/bin/env bash

#Script for collecting the coverage data from the tests being run
#Environment variables are defined in test-runner.env
#Please be sure to run run-tests.sh before using this script

echo "********Collecting And Sending Coverage Information******"
cat $COVERAGE_INFO | $COVERALLS 
