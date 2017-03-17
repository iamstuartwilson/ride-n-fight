const path = require('path');
const lowdb = require('lowdb');

const store = function createStore(name, storeType) {
  const db = lowdb(path.join(__dirname, `/../store/${name}.json`));
  const defaults = {};

  defaults[name] = storeType;
  db.defaults(defaults).write();

  return {
    get() {
      return db.get(name);
    },
    set() {
      return db.set(name);
    },
  };
}

module.exports = store;
