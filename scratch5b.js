// import Singleton from './scratch5a';
const Singleton = require('./scratch5a');

Singleton.add('apple');
Singleton.add('pear');
Singleton.add('banana');

console.log(`Getting item ${Singleton.get('apple')} from UserStore`);
console.log(`Getting item ${Singleton.get(1)} from UserStore`);
console.log(`Getting item ${Singleton.get(0)} from UserStore`);
