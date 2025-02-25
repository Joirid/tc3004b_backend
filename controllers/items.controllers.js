import {sqlConnect, sql} from '../utils/sql.js';

export const getItems = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query('SELECT * FROM items');
};