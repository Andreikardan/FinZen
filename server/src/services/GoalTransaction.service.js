const {GoalTransaction, Budget, Goal} = require('../db/models')


class GoalTransactionService {
    static async get() {
        return await GoalTransaction.findAll({
          include: [{ model: Budget }, { model: Goal }]
        });
      }

    static async getById(id) {
        return await GoalTransaction.findOne({
          where: { id },
          include: [{ model: Budget }, { model: Goal }],
        });
      }
    
    
      static async create(data) {
        return await GoalTransaction.create(data);
     
      }
    
}

module.exports = GoalTransactionService