const express = require("express");
const app = express();
const apiRouter = require("./routes/index");

app.use(express.json());
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
