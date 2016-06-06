# Alucard - Video Game Rom downloader (WIP)

## Overview

* Search available Roms for SNES, NES, Genesis etc.
* Download Roms
* Moves roms to Raspberry Pi (or any other destination)

## Web App
Angular 1.x front end with Express backend.  Search for roms by name and queue up downloads. Socket.io utilized to receive updates from download service as well as monitor the status of raspPi

## File Service
Node service that downloads, processes (e.g. unzips) and moves Rom to RaspPi.


## Running locally

To run locally, perform the following steps: 

* Install Vagrant and Virtual Box (on windows machine).  
* In the root folder, run the command `vagrant up` which will spin up the vm that hosts the mongo db.  
* Once done, you'll need to seed the database with consoles and available roms.  In the project root, run `npm run seed-database` to run the database seed script
* To build and run the web app and file service, run `npm run run-all` in the project root

If you don't want to use a VM to host the mongo instance:
* Install mongo locally on your machine
* Update the default value of the common/config.js file `dbConfig.dbAddress` key to the local address of the mongo instance or set the `DB_ADDRESS` environment variable to the mongo instance address.
