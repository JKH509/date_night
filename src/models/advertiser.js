class Advertiser {
  constructor(business_name, first_name, last_name, name, email, phone, address, description, imageUrl, startDate, endDate, price, place_id) {
    this.business_name = business_name;
    this.first_name = first_name;
    this.last_name = last_name;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.description = description;
    this.imageUrl = imageUrl;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.place_id = place_id;
  }

  static fromObj(obj) {
    return new Advertiser(
      obj.business_name,
      obj.first_name,
      obj.last_name,
      obj.name,
      obj.email,
      obj.phone,
      obj.address,
      obj.description,
      obj.imageUrl,
      obj.startDate,
      obj.endDate,
      obj.price,
      obj.place_id
    );
  }

  validate() {
    
    if (!this.business_name || typeof this.business_name !== 'string') {
      throw new Error('Invalid business name');
    }
    if (!this.first_name || typeof this.first_name !== 'string') {
      throw new Error('Invalid first name');
    }
    if (!this.last_name || typeof this.last_name !== 'string') {
      throw new Error('Invalid last name');
    }
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Invalid name');
    }
    // validate email, phone, address, description, imageUrl, startDate, endDate, price, and place_id
    // ...
  }
}