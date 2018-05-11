#!/bin/bash

#This script serves the purpose of cloning the TE-Backend repo from GitHub
#This script is used by the .travis.yml file so docker can run the test suite
#Feel free to use re-use this script for any additional complex setup work for
#Travis CI

cd ..
export TEBACKEND=$(pwd)/tE-backend
git clone https://github.com/WycliffeAssociates/tE-backend.git
cd $PROJ_DIR
