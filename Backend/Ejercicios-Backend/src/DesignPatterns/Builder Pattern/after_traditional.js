class Address {
  constructor(zip, street) {
    this.zip = zip
    this.street = street
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
}

class UserBuilder {
  constructor(name) {
    this.user = new User(name)
  }

  setAge(age) {
    this.user.age = age;
    return this; // "return this;" refers to the object instance on which the method is currently being called. It's used for chaining.
  }

  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

function builderDesignPattern(){
  const builder = new UserBuilder('Bob')
  const user = builder.setAge("25").setPhone("6643645936").setAddress(new Address('12345', 'Main St.')).build();  
  console.log(user);
}

export {builderDesignPattern}

//Modern way
// class Address {
//   constructor(zip, street) {
//     this.zip = zip
//     this.street = street
//   }
// }

// class User {
//   constructor(name, { age, phone = '123-456-7890', address } = {}) {
//     this.name = name
//     this.age = age
//     this.phone = phone
//     this.address = address
//   }
// }

// function builderDesignPattern(){
//   let user = new User('Bob', { address: new Address('12345', 'Main St.') });
//   console.log(user)
// }

// export {builderDesignPattern}