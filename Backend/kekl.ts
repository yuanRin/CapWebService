import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

const pool = new Pool({
    user: 'testcap_user',
    host: 'dpg-cg3ufmik728m6o3evo30-a.singapore-postgres.render.com',
    database: 'testcap',
    password: 'iymVSpqGphIx0ww1LZxAdO34EFJE3HuI',
    port: 5432,
    ssl: true, // enable SSL/TLS
    connectionTimeoutMillis: 10000 // Increase the timeout value to 5 seconds
});

app.get('/users', (req, res) => {
    pool.query('SELECT uid, frequency, voltage FROM public.users;', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error retrieving users from database' });
            return;
        }
        res.status(200).json(result.rows);
        res.end;
    });
});