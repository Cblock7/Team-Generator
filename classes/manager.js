const Employee = require ("./Employee");

class Manager extends Employee {
    constructor (name, id, email, phoneNumber) {
        super (name, id, email);
        this.phoneNumber = phoneNumber;
    }
    roleInput() {
        return "Manager";
    }
    numberInput() {
        return this.phoneNumber;
    }
}

module.exports = Manager;