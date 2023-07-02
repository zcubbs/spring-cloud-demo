FROM postgres:14-alpine
COPY init.sh /docker-entrypoint-initdb.d/
RUN apk update && apk add dos2unix
RUN dos2unix /docker-entrypoint-initdb.d/init.sh
RUN chmod +x /docker-entrypoint-initdb.d/init.sh
