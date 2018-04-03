FROM node:8.10.0-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Download dependencies
RUN apt-get update && apt-get install libfontconfig xfonts-thai python -y 

# Set path
# RUN export PATH=$PATH:/app/node_modules/phantomjs-prebuilt/bin:/app/node_modules/casperjs/bin
ENV PATH="$PATH:/app/node_modules/phantomjs-prebuilt/bin:/app/node_modules/casperjs/bin"

EXPOSE 80

CMD [ "node" ,"app.js" ]

