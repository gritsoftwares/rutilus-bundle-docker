Two folders, one for each container. There is a Dockerfile in each and the commands provided in the tutorial will automatically go into those folders and build the images, and set up the EC2 instance to auto-launch the containers and auto-restart them after crashes.

No mongo Dockerfile is present because the tutorial commands will grab the default mongo image from Docker Store and use that.

The structure of this repository must remain such that:

1. each module has its own folder and Dockerfile and is ran as a Docker container (except where modules are combined, ex. the current logger-and-analytics container).
2. the name of each module's folder does not change, because the setup script depends on it. If changes are made to the names of these folders or to the name of this repository itself (or its organization), the setup script in the AWS tutorial on the official website must be updated accordingly.
