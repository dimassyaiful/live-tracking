FROM node:18-alpine

WORKDIR /app

# Copy compiled app (sudah build)
COPY . .

# Expose port
EXPOSE 5556

# Start application (langsung dari compiled JS)
CMD ["node", "src/main.js"]
