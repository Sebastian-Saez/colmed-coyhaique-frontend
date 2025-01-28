# # Use an official node runtime as a parent image
# FROM node:16

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Ajustar permisos para evitar problemas de EACCES
# RUN mkdir -p /app/node_modules/.q-cache/vite/spa && \
#     chown -R node:node /app && \
#     chmod -R 777 /app

# # Expose the port the app runs on
# EXPOSE 8080

# # Define the command to run the app
# CMD ["npm", "run", "dev"]


############# VERSION PREVIA #############

# Use an official node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Instalar http-server globalmente
RUN npm install -g http-server

# Copy the rest of the application code
COPY . .

# Ajustar permisos para evitar problemas de EACCES
RUN mkdir -p /app/node_modules/.q-cache/vite/spa && \
    chown -R node:node /app && \
    chmod -R 777 /app

# Expose the port the app runs on
EXPOSE 8080

# Define the default command (development)
CMD ["npm", "run", "dev"]
