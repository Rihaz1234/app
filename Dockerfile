############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY ./dist /usr/share/nginx/html
RUN sed -i -e 's/server {/add_header X-Frame-Options SAMEORIGIN; add_header X-XSS-Protection "1; mode=block"; server_tokens off; server {/g' /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]