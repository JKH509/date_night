class User {
  constructor(first_name, last_name, email, password_hash) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password_hash = password_hash;
  }

  validate() {
    if (typeof this.first_name !== 'string' || typeof this.last_name !== 'string' || typeof this.email !== 'string' ) {
      throw new Error('Invalid user data');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Invalid email format');
    }
    if (typeof this.password_hash !== 'string'  ) {
      throw new Error('Invalid password data');
    }
  }
}

module.exports = User;