# Alucard - Video Game Rom downloader (WIP)

## Overview

* Search available Roms for SNES, NES, Genesis etc.
* Download Roms
* Moves roms to Raspberry Pi (or any other destination)

## Web App
Angular 1.x front end with Express backend.  Search for roms by name and queue up downloads. Socket.io utilized to receive updates from download service as well as monitor the status of raspPi

## File Service
Node service that downloads, processes (e.g. unzips) and moves Rom to RaspPi.
