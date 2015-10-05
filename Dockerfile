FROM node:0.10-onbuild

RUN \
  source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | tee /etc/apt/sources.list.d/rethinkdb.list \
  wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | apt-key add - \
  apt-get update \
  apt-get install -y rethinkdb \
  cp /etc/rethinkdb/default.conf/sample /etc/rethinkdb/instances.d/gwazoo.conf \
  /etc/init.d/rethinkdb restart

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["rethinkdb", "--bind", "all"]

# Expose ports.
#   - 8080: web UI
#   - 28015: process
#   - 29015: cluster
EXPOSE 8080
EXPOSE 28015
EXPOSE 29015
EXPOSE 1337