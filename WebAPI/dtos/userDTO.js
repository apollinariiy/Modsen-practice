class UserDto {
    constructor(model) {
        this.id = model.id;
        this.login = model.login;
        this.password = model.password;
        this.role = model.role;
    }
}

module.exports = UserDto;