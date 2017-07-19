
'use strict';

const Users = require('./../models/Users');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
const mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");


exports.aCheckEmailRegister(email) {
        let connection = await connect();
        let rBankAdmin = r.table('usermaster')
            .filter({ email }).coerceTo('array')
            .run(connection);
        [rBankAdmin] = await Promise.all([rBankAdmin]);
        return (rBankAdmin && rBankAdmin.length);
    }





 

module.exports = {

    aCheckEmailRegister

};