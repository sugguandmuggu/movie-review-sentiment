# Build Stage: Using Node to build the application
FROM node:18-alpine as build

WORKDIR /app
# Copy all frontend files
COPY . .
# Install dependencies and build the production-ready React app
RUN npm install
RUN npm run build

# Production Stage: Serve with nginx
FROM nginx:alpine

# Copy the build output from the previous stage into NGINX's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 which NGINX listens on
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
