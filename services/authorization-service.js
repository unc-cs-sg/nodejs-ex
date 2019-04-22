const   User = require("../db/sequelize").users,
        Sequelize = require("sequelize"),
        BadRequestException = require("../exceptions/bad-request-exception"),
        InternalErrorException = require("../exceptions/internal-error-exception"),
        CarolinaCupboardException = require("../exceptions/carolina-cupboard-exception");

exports.getUserType = async function (onyen) {
    if(process.env.NODE_ENV === 'dev') {
        if(process.env.DEV_USERTYPE === "admin" || process.env.DEV_USERTYPE === "volunteer") {
            return process.env.DEV_USERTYPE;
        }
        else return "user";
    }
    try {
        let user = await User.findOne({ where: { onyen: onyen } });
        if (!user) {
            return "user"
        }
        return user.type;
    } catch (e) {
        if(e instanceof CarolinaCupboardException) {
            throw e;
        }

        throw new InternalErrorException("A problem occurred when retrieving the user",e);
    }
}