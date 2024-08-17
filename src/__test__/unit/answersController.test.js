const { createAnswer } = require('../../controllers/answersController');

describe("createAnswer - Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: { questionId: 1 },
      user: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test("should return error if content is missing", async () => {
    req.body.content = undefined;

    await createAnswer(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" });
  });

});
