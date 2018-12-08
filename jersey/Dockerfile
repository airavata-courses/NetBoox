FROM ubuntu:latest
MAINTAINER Harshal Pandit <hapandit@iu.edu>
RUN apt-get update && apt-get install -y git-core
RUN git clone -b jersey_service https://github.com/airavata-courses/NetBoox.git
WORKDIR /NetBoox/
RUN apt-get update && apt-get install -y wget
RUN chmod 777 java_installation.sh maven_installation.sh tomcat_installation.sh tomcat-users.xml maven_useradd.sh maven_users.txt settings.xml deploy.sh

RUN ./java_installation.sh
RUN ./maven_installation.sh
RUN ./tomcat_installation.sh
RUN chmod 777 /usr/share/maven/conf/settings.xml
RUN ./maven_useradd.sh
RUN cp tomcat-users.xml /opt/tomcat9/conf/tomcat-users.xml 
EXPOSE 8080
ENTRYPOINT ["/NetBoox/deploy.sh"]
