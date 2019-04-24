'use strict';

const _data = [];

const UserStore = {
  add: item => _data.push(item),
  get: id => _data.find(d => d === id)
};

Object.freeze(UserStore);
// export default UserStore;
module.exports = UserStore;