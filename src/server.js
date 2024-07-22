const express = require("express");
const app = express();
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");

app.use(express.json());
app.use("/api/questions", questionsRouter);
app.use("/api/answers", answersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
