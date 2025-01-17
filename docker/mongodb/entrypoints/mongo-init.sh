#!/bin/bash

mongo -- "$MONGODB_NAME" <<EOF
    var database = '$MONGODB_NAME';
    var user = '$MONGODB_USER';
    var password = '$MONGODB_PASSWORD';

    db.getSiblingDB(database);

    db.createUser({user: user, pwd: password, roles: [{ role: 'readWrite', db: database }]});
EOF
