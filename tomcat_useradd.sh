#!/bin/bash

sed -i '/<tomcat-users>/r tomcat_users.txt' tomcat_users.xml
