import axios from "axios";
import { User } from "../models/User.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import connection from "../db/connect_mysql.js";
import bcrypt from 'bcrypt'

const saltRounds = 10; 




export const registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        
        
        if (!email || !username || !password) {
            return res.status(400).json({
                message: "please provide all fields"
            });
        }

        const encrypted_pass = await bcrypt.hash(password, saltRounds);

        // console.log(encrypted_pass);
        
        const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        
        connection.query(query, [email, username, encrypted_pass], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error registering user",
                    error: err
                });
            }

            console.log('Registration success ' + results.insertId);
            return res.status(201).json({
                message: "User created successfully",
                userId: results.insertId
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "An exception occurred",
            error: error.message
        });
    }
};



export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all fields"
            });
        }

        const query = 'SELECT * FROM users WHERE email = ?';

        connection.query(query, [email], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error logging in",
                    error: err
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const user_info = results[0];
            console.log(results)
            console.log(user_info)

            if (!bcrypt.compare(password, user_info.password)) {
                return res.status(403).json({
                    message: "Invalid password"
                });
            }

            let token = jwt.sign({ email: user_info.email, username: user_info.username }, process.env.secretKey, { expiresIn: '1h' });
            

            return res.status(200).json({
                message: "User validated",
                user_token: token
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "An exception occurred",
            error: error.message
        });
    }
};





export const getUsers = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM users';
        // console.log("api hit")

        connection.query(query, [], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error logging in",
                    error: err
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: "No user found"
                });
            }

            return res.status(200).json({
                message: results
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "An exception occurred",
            error: error.message
        });
    }
};




export const updateUser = async (req, res, next) => {
    try {

        const {id, email, username, password } = req.body;


        if (!id || !email || !username || !password){

            return res.status(500).json({
                message: "fill all fields"
            });
        }

        const query = 'UPDATE users SET email= ? , username = ?, password = ? WHERE id = ?';
        // console.log("api hit")

        const encrypted = await bcrypt.hash(password, saltRounds)

        connection.query(query, [email, username, encrypted, id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error updating user info",
                    error: err
                });
            }


            return res.status(200).json({
                message: 'user updated sucessfully'
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "An exception occurred",
            error: error.message
        });
    }
};


export const deleteUser = async (req, res, next) => {
    try {

        const id = req.params.id;

        if (!id){

            return res.status(500).json({
                message: "no user info available"
            });
        }

        const query = 'DELETE FROM users WHERE id = ?';
        // console.log("api hit")

        connection.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Error updating user info",
                    error: err
                });
            }

            // console.log(results)

            // if (results.length === 0) {
            //     return res.status(400).json({
            //         message: "No user found"
            //     });
            // }

            return res.status(200).json({
                message: 'user deleted sucessfully'
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "An exception occurred",
            error: error.message
        });
    }
};

