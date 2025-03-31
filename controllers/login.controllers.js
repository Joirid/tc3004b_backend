import {sqlConnect, sql} from '../utils/sql.js';
import crypto from 'crypto';

export const register = async (req, res) => {
    try{
        const pool = await sqlConnect();
        const salt = crypto.randomBytes(16).toString('base64url').slice(0, 10);
        const saltPassword = salt + req.body.password;

        // Crear el hash de la contraseña con el salt
        const hashing = crypto.createHash('sha512');
        const hash = hashing.update(saltPassword).digest("base64url");

        // Concatenar el salt y el hash para almacenar en la base de datos
        const passHashSalt = salt + hash;

        // Insertar el usuario en la base de datos
        await pool.request()
        .input("name", sql.VarChar, req.body.name)
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, passHashSalt)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');

        // Obtener el usuario recién registrado para confirmar
        const data = await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .query('SELECT * FROM users WHERE username = @username');

        // Enviar respuesta al cliente
        res.status(200).json({
            operation: true,
            message: "User registered successfully",
            user: data.recordset[0]
        });
    } catch (error) {
        console.error("Error in register function:", error);
        res.status(500).json({
            operation: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("username", sql.VarChar, req.body.username).query('SELECT * FROM users WHERE username = @username');
    console.log(data.recordset);
    let isLogin = data.recordset[0].password === req.body.password;
    if (isLogin) {
        res.status(200).json({ isLogin: isLogin, user: data.recordset[0] });
    } else {
        res.status(400).json({ isLogin: isLogin, user: {} });
    }
};

export const login2 = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool.request().input("username", sql.VarChar, req.body.username).query('SELECT * FROM users WHERE username = @username');
        console.log(data.recordset);

        // Obtener el salt y el hash almacenados en la base de datos
        const storedHash = data.recordset[0].password.slice(10);
        const salt = data.recordset[0].password.slice(0, 10);

        // Concatenar el salt y la contraseña proporcionada por el usuario para crear el hash
        const saltPassword = salt + req.body.password;
        const hashing = crypto.createHash('sha512');
        const hash = hashing.update(saltPassword).digest("base64url");

        // Comparar el hash almacenado con el hash generado
        let isLogin = storedHash === hash;

        // Enviar respuesta al cliente
        if (isLogin) {
            res.status(200).json({ isLogin: isLogin, user: data.recordset[0] });
        } else {
            res.status(400).json({ isLogin: isLogin, user: {} });
        }
    } catch (error) {
        console.error("Error in login2 function:", error);
        res.status(500).json({
            operation: false,
            message: "An error occurred during login",
            error: error.message
        });
    }
};

export const updatePassword= async (req, res) => {
    try {
        const pool = await sqlConnect();
        const salt = crypto.randomBytes(16).toString('base64url').slice(0, 10);
        const saltPassword = salt + req.body.password;

        // Crear el hash de la contraseña con el salt
        const hashing = crypto.createHash('sha512');
        const hash = hashing.update(saltPassword).digest("base64url");

        // Concatenar el salt y el hash para almacenar en la base de datos
        const passHashSalt = salt + hash;

        // Actualizar la contraseña en la base de datos
        await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .input("password", sql.VarChar, passHashSalt)
            .query('UPDATE users SET password = @password WHERE username = @username');
        // Obtener el usuario actualizado para confirmar    
        const data = await pool.request()
            .input("username", sql.VarChar, req.body.username)
            .query('SELECT * FROM users WHERE username = @username');
        // Enviar respuesta al cliente
        res.status(200).json({
            operation: true,
            message: "Password updated successfully",
            user: data.recordset[0]
        }
        );
    } catch (error) {
        console.error("Error in updatePassword function:", error);
        res.status(500).json({
            operation: false,
            message: "An error occurred during password update",
            error: error.message
        });
    }
};