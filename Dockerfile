FROM nginx
ADD VERSION .
COPY ./dist /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
