# Use official Node.js image as the base image
FROM node:20.10.0 

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn run build

# Expose port 3000 (assuming Next.js default port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
