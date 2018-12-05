#!/bin/sh

/opt/tomcat9/bin/startup.sh
mvn clean tomcat7:deploy
tail -f /dev/null
