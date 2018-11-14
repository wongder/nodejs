class Cat {
  makeSound() {
    return 'Meowww';
  }
}
// exports = Cat; // It will not work
module.exports = Cat;