const db = wx.cloud.database({
  env: 'dev-showdog'
});
const Users = db.collection('users');
const Dogs = db.collection('dogs');
const DogDetail = db.collection('dog-detail');
const Message = db.collection('message');
const Dictionary = db.collection('dictionary');
export {
  Users,
  Dogs,
  DogDetail,
  Message,
  Dictionary
}