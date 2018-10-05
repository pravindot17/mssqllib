let mssql = require('mssql');
let libMssql = {};
libMssql.conn = {};

module.exports = {
    __init: init,
    __select: select,
    __insert: insert,
    __update: update,
    __close: close,
    __getPoolConnection: getPoolConnection
}

function init(dbConfig) {
    if(!dbConfig.server) reject(new Error('Please provide the server name'));
    if(!dbConfig.database) reject(new Error('Please provide the database name'));
    if(!dbConfig.user) reject(new Error('Please provide the database user'));
    if(!dbConfig.password) reject(new Error('Please provide the database password'));

    // set config here for later use
    libMssql.dbConfig = dbConfig;

    if(!libMssql.conn[libMssql.dbConfig['database']]) {
        return new Promise(function (resolve, reject) {
            mssql.connect(libMssql.dbConfig).then(function (connPool) {
                libMssql.conn[libMssql.dbConfig['database']] = connPool;
                resolve(connPool);
            }).catch(function (err) {
                libMssql.conn[libMssql.dbConfig['database']] = null;
                reject(err);
            });
        });
    }
    return libMssql.conn[libMssql.dbConfig['database']];
}

function select(query, queryParams = []) {
    return new Promise((resolve, reject) => {
        if (libMssql.conn[libMssql.dbConfig['database']]) {
            var sqlRequest = new mssql.Request(libMssql.conn[libMssql.dbConfig['database']]);
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
        if (libMssql.conn[libMssql.dbConfig['database']]) {
            var sqlRequest = new mssql.Request(libMssql.conn[libMssql.dbConfig['database']]);
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
        if (libMssql.conn[libMssql.dbConfig['database']]) {
            var sqlRequest = new mssql.Request(libMssql.conn[libMssql.dbConfig['database']]);
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
    await libMssql.conn[libMssql.dbConfig['database']].close();
}

function getPoolConnection(dbConfig) {
    return new Promise(async (resolve, reject) => {
        // set config here for later use
        libMssql.dbConfig = dbConfig;

        if (!libMssql.conn[libMssql.dbConfig['database']]) {
            libMssql.conn[libMssql.dbConfig['database']] = new mssql.ConnectionPool(libMssql.dbConfig);
            await libMssql.conn[libMssql.dbConfig['database']].connect();
            resolve(libMssql.conn[libMssql.dbConfig['database']]);
        } else {
            resolve(libMssql.conn[libMssql.dbConfig['database']]);
        }
    });
}
