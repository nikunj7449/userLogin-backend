const userList = [];

exports.User = class User {
    constructor(username, password) {
        this.id = Date.now();
        this.username = username;
        this.password = password;
    }
    save() {
        userList.push(this);
       console.log("UserList:", userList);
        return;
    }
    static fetchAll() {
        return userList;
    }
}

