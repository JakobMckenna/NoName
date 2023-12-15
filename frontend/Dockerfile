FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
RUN npm install --max-attempts=3 --retry-delay=5000

# Copy frontend directory
COPY . .

# Expose the port this will run on
EXPOSE 3000

# Build the project
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]