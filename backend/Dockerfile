FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy backend directory
COPY . .

# Expose the port this will run on
EXPOSE 5001

# Copy startup script
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Download wait-for-it.sh
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Start the application using the startup script
CMD ["/app/startup.sh"]