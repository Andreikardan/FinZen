const router = require("express").Router();
const userRouter = require("./auth.routes");

const budgetRouter = require('./budget.routes')
const categoryDRouter = require('./categoryd.routes')
const categoryRRouter = require('./categoryr.routes')
const transactionDRouter = require('./transactiond.routes')
const transactionRRouter = require('./transactionr.routes')
const formatResponse = require("../utils/formatResponse");
const goalRouter = require("./goal.routes")

router

.use("/auth", userRouter)
.use('/budgets', budgetRouter)
.use('/categoryds', categoryDRouter)
.use('/categoryrs', categoryRRouter)
.use('/transactionds', transactionDRouter)
.use('/transactionrs', transactionRRouter)
.use('/goals', goalRouter)

 


 
 


router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
