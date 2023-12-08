# how to start m3u8-server

## install pm2

npm install pm2 -g

## start app using pm2

pm2 start src/index.js --name "m3u8-server"

## pm2 check status of process

pm2 status

## pm2 restart process

pm2 restart id/name

## pm2 stop process

pm2 stop id/name
