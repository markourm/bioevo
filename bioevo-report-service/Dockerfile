FROM openjdk:10-jdk
MAINTAINER Marko Urm <markourm@gmail.com>
RUN apt-get update && apt-get install -qq -y --no-install-recommends netcat-openbsd 
RUN mkdir -p /usr/local/bioevo-report-service
ARG JAR_FILE
ADD target/${JAR_FILE} /usr/local/bioevo-report-service/bioevo-report-service.jar
ADD run.sh run.sh
RUN chmod +x run.sh
CMD ./run.sh