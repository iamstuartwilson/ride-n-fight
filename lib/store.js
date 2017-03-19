const path = require('path');
const lowdb = require('lowdb');

module.exports = class Store {
  constructor(name, storeType) {
    const defaults = {};

    defaults[name] = storeType;

    this.db = lowdb(path.join(__dirname, `/../store/${name}.json`));
    this.db.defaults(defaults).write();

    this.dbName = name;
  }

  get() {
    return this.db.get(this.dbName);
  }

  set() {
    return this.db.set(this.dbName);
  }
}
