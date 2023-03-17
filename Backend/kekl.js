"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var pg_1 = require("pg");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
var pool = new pg_1.Pool({
    user: 'testcap_user',
    host: 'dpg-cg3ufmik728m6o3evo30-a.singapore-postgres.render.com',
    database: 'testcap',
    password: 'iymVSpqGphIx0ww1LZxAdO34EFJE3HuI',
    port: 5432,
    ssl: true,
    connectionTimeoutMillis: 10000 // Increase the timeout value to 5 seconds
});
app.get('/users', function (req, res) {
    pool.query('SELECT uid, frequency, voltage FROM public.users;', function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error retrieving users from database' });
            return;
        }
        res.status(200).json(result.rows);
        res.end;
    });
});
