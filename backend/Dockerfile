FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# Install backend dependencies
RUN npm install --max-attempts=3 --retry-delay=5000

# Copy backend directory
COPY . .

# Expose the port this will run on
EXPOSE 5001

RUN npm run postinstall

# Build the project
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
