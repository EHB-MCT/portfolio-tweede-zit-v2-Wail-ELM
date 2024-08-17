const { createQuestion } = require('../../controllers/questionsController');

describe("createQuestion - Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      user: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  test("should return error if content is missing", async () => {
    req.body.content = undefined; 
    await createQuestion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" });
  });

});
