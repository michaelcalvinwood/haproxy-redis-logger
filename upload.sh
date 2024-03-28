#!/bin/bash

rsync -a --exclude "node_modules" . root@haproxy.pymnts.com:/home/haproxy-redis-logger/