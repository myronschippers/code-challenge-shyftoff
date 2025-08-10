import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.resolve(__dirname, '../../database', 'shyftoff.db');

const sql3 = sqlite3.verbose();

const DB = new sql3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    throw Error(err.message);
  } else {
    console.log('Connected to database');
  }
});

export default DB;
