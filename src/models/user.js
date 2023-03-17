class User {
  id;
  name;
  username;
  password;
  image;
  isDeleted
  constructor(id, name, username, password, image, isDeleted = false) {
    this.id = id;
    this.name = name
    this.username = username;
    this.password = password;
    this.image = image;
    this.isDeleted = isDeleted;
  }
}

module.exports = User;
