let mssql = require('mssql');
let libMssql = {};

module.exports = {
    __init: init,
    __select: select,
    __insert: insert,
    __update: update,
    __close: close,
    __getPoolConnection: getPoolConnection
}

function init(dbConfig) {
    // set config here for later use
    libMssql.dbConfig = dbConfig;

    if(!libMssql.conn) {
        return new Promise(function (resolve, reject) {
            mssql.connect(libMssql.dbConfig).then(function (connPool) {
                libMssql.conn = connPool;
                resolve(connPool);
            }).catch(function (err) {
                libMssql.conn = null;
                reject(err);
            });
        });
    }
    return libMssql.conn;
}

function select(query, queryParams = []) {
    return new Promise((resolve, reject) => {
        if (libMssql.conn) {
            var sqlRequest = new mssql.Request(libMssql.conn);
            for(let key in queryParams) {
                sqlRequest.input(key, queryParams[key]);
            }
            resolve(sqlRequest.query(query));
        } else {
            reject(new Error('Mssql is not connected, please try again later'));
        }
    });
}

function insert(query, queryParams = []) {
    return new Promise((resolve, reject) => {
        if (libMssql.conn) {
            var sqlRequest = new mssql.Request(libMssql.conn);
            for(let key in queryParams) {
                sqlRequest.input(key, queryParams[key]);
            }
            resolve(sqlRequest.query(query));
        } else {
            reject(new Error('Mssql is not connected, please try again later'));
        }
    });
}


function update(query, queryParams = []) {
    return new Promise((resolve, reject) => {
        if (libMssql.conn) {
            var sqlRequest = new mssql.Request(libMssql.conn);
            for(let key in queryParams) {
                sqlRequest.input(key, queryParams[key]);
            }
            resolve(sqlRequest.query(query));
        } else {
            reject(new Error('Mssql is not connected, please try again later'));
        }
    });
}

async function close() {
    await libMssql.conn.close();
}

function getPoolConnection(dbConfig) {
    return new Promise(async (resolve, reject) => {
        // set config here for later use
        libMssql.dbConfig = dbConfig;

        if (!libMssql.conn) {
            libMssql.conn = new mssql.ConnectionPool(libMssql.dbConfig);
            await libMssql.conn.connect();
            resolve(libMssql.conn);
        } else {
            resolve(libMssql.conn);
        }
    });
}
