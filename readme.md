Two folders, one for each container. There is a Dockerfile in each and the commands provided in the tutorial will automatically go into those folders and build the images, and set up the EC2 instance to auto-launch the containers and auto-restart them after crashes.

No mongo Dockerfile is present because the tutorial commands will grab the default mongo image from Docker Store and use that.
