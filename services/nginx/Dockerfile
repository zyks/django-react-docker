FROM nginx:1.14-alpine


COPY nginx.conf /etc/nginx/
COPY .htpasswd /etc/nginx/
COPY conf.d/website.conf /etc/nginx/conf.d/
COPY ssl/* /etc/nginx/ssl/

RUN mkdir -p /var/www
COPY --from=backend_image /var/app/public/* /var/www/
COPY --from=web_image /usr/src/app/build /var/www/

# EXPOSE 80
# EXPOSE 443
