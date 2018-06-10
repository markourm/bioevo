# BioEvo

Tetrapod evolution simulator

## Prerequisites

Requires following to be installed on target system:

Git:
https://git-scm.com/downloads

Docker:
https://docs.docker.com/install/

Java 10 JDK: 
http://www.oracle.com/technetwork/java/javase/downloads/index.html

Node.js 10.x:
https://nodejs.org/en/

Angular CLI 6.x:
`npm install -g @angular/cli@">=6.0.0 <7.0.0"`

## Build and deploy

./mvnw clean install
./docker-compose-up

Visit http://localhost/

## Stop and remove the docker containers

./docker-compose-down
