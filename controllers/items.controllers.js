import {sqlConnect, sql} from '../DB/sql.js';

export const getItems = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query('SELECT * FROM items');
    res.json(data.recordset);
};

export const getItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("id", sql.Int, req.params.id).query('SELECT * FROM items WHERE id = @id');
    res.json(data.recordset);
};

export const postItem = async (req, res) => {
    const pool = await sqlConnect();
    await pool.request().input("name", sql.VarChar, req.body.name).input("price", sql.Float, req.body.price).query('INSERT INTO items (name, price) VALUES (@name, @price)');
    const data = await pool.request().input("name", sql.VarChar, req.body.name).query('SELECT * FROM items WHERE name = @name');
    //console.log(data.recordset);
    res.status(200).json({ operation: true, item: data.recordset[0] });
};

export const putItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("id", sql.Int, req.params.id).input("name", sql.VarChar, req.body.name).input("price", sql.Float, req.body.price).query('UPDATE items SET name=@name, price=@price WHERE id = @id');
    res.status(200).json({ operation: true });
};

export const deleteItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("id", sql.Int, req.params.id).query('DELETE FROM items WHERE id = @id');
    res.status(200).json({ operation: true });
};