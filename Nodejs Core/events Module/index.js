const EventEmitter = require('events');
const nodemailer = require('nodemailer');
require('dotenv').config();

class AccountEvents extends EventEmitter {}

const accountEvents = new AccountEvents();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email_user,
        pass: process.env.email_pass
    }
});

accountEvents.on('registration', (user) => {
    const mailOptions = {
        to: user.email,
        text: `Регистрация пользователя`
    };

    transporter.sendMail(mailOptions)

    console.log(`Пользователь зарегистрирован: ${user.email}`);
});

accountEvents.on('login', (user) => {
    const mailOptions = {
        to: user.email,
        text: `Вход пользователя`
    };

    transporter.sendMail(mailOptions);

    console.log(`Вход пользователя: ${user.email}`);
});

accountEvents.on('password', (user) => {
    const mailOptions = {
        to: user.email,
        text: `Изменение пароля`
    };

    transporter.sendMail(mailOptions);

    console.log('Пользователь изменил пароль');
});

const user = {
    email: process.env.email_user,
    name: 'Polina'
};

accountEvents.emit('registration', user);
accountEvents.emit('password', user);
accountEvents.emit('login', user);
