class User {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  hasAccess() {
    return this.name === 'Bob'
  }
}

class NullUser {
  constructor() {
    this.id = -1
    this.name = 'Guest'
  }

  hasAccess() {
    return false
  }
}

const users = [
  new User(1, 'Bob'),
  new User(2, 'John')
]

function NullObjectDesignPattern(id) {
  const user = users.find(user => user.id === id);
  if (user == null) return new NullUser(); //We are now checking if the user is null before returning, and instead returning a NullUser object if the user is null. This means that we no longer need to check for null users later in the code and can treat all users that are returned from this function the same whether they exist or not.
  console.log('Hello ' + user.name)
  user.hasAccess() ? console.log('You have access') : console.log('You are not allowed here');
}

export {NullObjectDesignPattern}