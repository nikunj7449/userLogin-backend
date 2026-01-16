const userList = [];

exports.User = class User {
  constructor(username, email, phone, password) {
    this.id = Date.now();
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  save() {
    userList.push(this);
    console.log("UserList:", userList);
    return this;
  }

  static fetchAll() {
    return userList;
  }

  static findByUsername(username) {
    return userList.find(user => user.username === username);
  }

  static deleteUserById(id) {
    const index = userList.findIndex(user => user.id === id);
    if (index !== -1) {
      userList.splice(index, 1);
      return true;
    }
    return false;
  }
  
  static editUserById(id, newData) {
    const user = userList.find(user => user.id === id); 
    if (user) {
      Object.assign(user, newData); 
      return true;
    }
    return false;
  }

  static validateLogin(username, password) {
    const user = userList.find(
      u => u.username === username && u.password === password
    );
    return user ? true : false;
  }
};
