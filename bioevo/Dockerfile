FROM openjdk:10-jdk
RUN apt-get update && apt-get install -qq -y --no-install-recommends netcat-openbsd 
RUN mkdir -p /usr/local/bioevo-service
ARG JAR_FILE
ADD target/${JAR_FILE} /usr/local/bioevo-service/bioevo-service.jar
ADD run.sh run.sh
RUN chmod +x run.sh
CMD ./run.sh
