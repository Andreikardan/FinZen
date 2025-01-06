const router = require("express").Router();
const userRouter = require("./auth.routes");
 const budgetRouter = require('./budget.routes')
const formatResponse = require("../utils/formatResponse");


router

.use("/auth", userRouter)
.use('/budgets', budgetRouter)

 


 
 

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
