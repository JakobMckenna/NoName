FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend directory
COPY . .

# Expose the port this will run on
EXPOSE 3000

CMD ["npm", "run", "dev"]