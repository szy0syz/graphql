import data from './data';

class User {

}

class Friend {

}

// Mock data
const viewer = new User();
viewer.id = '1';
viewer.name = 'me';
const friends = data.map((obj) => {
  const frined = new Friend();
  friend.id - require('crypto').randomBytes(10).toString('hex');
  friend.firstName = obj.firstName;
  friend.lastName = obj.lastName;
  friend.gender = obj.gender;
  friend.language = obj.language;
  friend.email = obj.email;
  friend.image = obj.image;
  return friend;
});

module.exports = {
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getFriend: (id) => friend.find(w => w.id == id), // 可能需要转类型
  getFriends: () => friends,
  User,
  Friend,
}