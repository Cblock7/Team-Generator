class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    nameInput() {
        return this.name;
    }
    IdInput() {
        return this.id;
    }
    emailInput() {
        return this.email;
    }
    roleInput() {
        return "Employee";
    }
}

module.exports = Employee;