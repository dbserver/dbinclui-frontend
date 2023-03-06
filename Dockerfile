FROM nginx:mainline-alpine-slim

#arquivo de configuração 
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#####

COPY ./build /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
