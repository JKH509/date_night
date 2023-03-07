const { emailRegex } = require("../utils/constants/constantText");

class Guest {
  constructor(first_name, last_name, email) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }

  validate() {
    if (typeof this.first_name !== 'string' || typeof this.last_name !== 'string' || typeof this.email !== 'string' ) {
      throw new Error('Invalid guest data');
    }
    if (!emailRegex.test(this.email)) {
      throw new Error('Invalid email format');
    }
  }
}

module.exports = Guest;