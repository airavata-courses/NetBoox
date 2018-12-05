#!/bin/sh

tomcat_path=/opt/tomcat9/
pid=$(ps -ef | grep "${tomcat_path}" | grep -v grep | cut -d ' ' -f 1)
if [ "${pid}" ]; then
  echo "Tomcat is up, skipping installation."
else
  echo "tomcat not found"
  echo "-------Installing tomcat---------"
  cd /tmp && wget http://mirrors.sonic.net/apache/tomcat/tomcat-9/v9.0.12/bin/apache-tomcat-9.0.12.tar.gz
  tar -xzf apache-tomcat-9.0.12.tar.gz
  mv apache-tomcat-9.0.12 /opt/tomcat9
  chmod -R g+r /opt/tomcat9/conf
  chmod g+x /opt/tomcat9/conf
  chmod 777 /opt/tomcat9/conf/tomcat-users.xml

  cp tomcat-users.xml /opt/tomcat9/conf/tomcat-users.xml
  cd /opt/tomcat9/bin
  ./startup.sh
fi
