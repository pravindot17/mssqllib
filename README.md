Mssql Library for CRUD operations
===================

## How to use
```js
let mssqlDb = require('mssqllib');

let config = {
    connection_limit: 10,
    server: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
}

// init the connection in your bootstrap file using following code
mssqlDb.__init(config).then(() => {
    console.log('Mssql connection started successfully');
}).catch(err => {
    throw err;
});

// later you can use the crud functions in following way
mssqlDb.__select('SELECT * FROM test WHERE id >= $1', [10]).then((result) => {
    console.log('Got the result', result);
}).catch(err => {
    throw err;
});

// using pool
await mssqlDb.__getPoolConnection(config);
mssqlDb.__select('SELECT * FROM test WHERE id >= $1', [10]).then((result) => {
    console.log('Got the result', result);
}).catch(err => {
    throw err;
});
```
