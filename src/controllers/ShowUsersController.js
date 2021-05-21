import User from '../models/User'

exports.getAllUsers = async (req, res) => {
  //const users = [{ id:1, name: 'Imie Usera'}]
  const users = await User.query()
  /*.withGraphFetched('Posts')*/

  res.send(users)
};

exports.getUser = async (req, res) => {
  //const users = [{ id:1, name: 'Imie Usera'}]
  
  const user = await User.query().findById(req.params);
  /*.withGraphFetched('Posts')*/

  res.send(user)
};