import { EventEmitter } from 'events';

class UserStore extends EventEmitter {
  profile = null;
  users = [];

  setUser(profile) {
    this.profile = profile;
    this.emit('change', profile);
  }

  getUser() {
    return this.profile;
  }

  setUsers(users) {
    this.users = users || [];
    this.emit('users', this.users);
  }

  getUsers() {
    return this.users;
  }
}

export default new UserStore();
