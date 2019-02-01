FROM node:alpine AS builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

# Actually build prodution assets
RUN npm run build

# A second FROM statement tells docker the first phase is done
# and that the second phase is now beginning
FROM nginx

# Need to expose port 3000 for Docker; tells the developer that
# this container needs to get a port mapped to 3000
# In Elastic Beanstalk, it uses this instruction to map
# incoming traffic to port 3000
EXPOSE 3000

# Overwrite default nginx config file with the custom one;
# all we had to change was which port it was using to
# listen: 3000 and a special rule to allow our production
# assets to be shared
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# This line tells Docker that we want to copy data from a
# different phase, in this case "builder", to the static
# html directory for nginx (directory listed from docs)
COPY --from=builder /app/build /usr/share/nginx/html