wx.cloud.init({
  traceUser: true,
  env: 'dev-showdog',
});
const db = wx.cloud.database({
  env: 'dev-showdog'
});
const Users = db.collection('users');
const Dogs = db.collection('dogs');
const DogDetail = db.collection('dog-detail');
const Message = db.collection('message');
export {
  Users,
  Dogs,
  DogDetail,
  Message
}