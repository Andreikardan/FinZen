const { User } = require("../db/models");

class UserService {
  static async create(data) {
    return await User.create(data);
  }
  static async getByEmail(email) {
    
    return await User.findOne({ where: { email } });
  }
  static async getById(id){
    return await User.findByPk(id)
  }
  
  static async getEmails(){
    return await User.findAll()
  }

  static async update(user,data){
    return await user.update(data)
  }
}
module.exports = UserService;
