const prisma = require('../models/prisma');

module.exports = async function (req, res, next) {
    try {
        const now = new Date();
        now.setHours(now.getHours() + 3);
        await prisma.meetups.deleteMany({
            where: {
                date: {
                    lt: now
                }
            }
        });
        next();
    } catch (error) {
        next(error);
    }
};