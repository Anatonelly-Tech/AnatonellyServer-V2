const mongoose = require('mongoose');

const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')
const { addHours } = require('date-fns')
const format = 'DD-MM-YYYY HH:mm:ss'

const UserSchema = new mongoose.Schema({
    hash:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: String,
        default: formatToTimeZone(addHours(new Date(),-1),format, { timeZone: 'America/Sao_Paulo'})
    },
});


module.exports = {
    User: mongoose.model('User', UserSchema),
    UserSchema
};