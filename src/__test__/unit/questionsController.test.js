const {
  getQuestions,
  createQuestion,
  deleteQuestion,
} = require("../../controllers/questionsController");

jest.mock("config/knex", () => () => ({
  select: jest.fn(),
  insert: jest.fn(),
  where: jest.fn().mockReturnThis(),
  del: jest.fn(),
}));

describe("questionsController", () => {
  let req;
  let res;
  let knexMock;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    knexMock = require("config/knex")();
  });

  describe("getQuestions", () => {
    test("should get questions successfully", async () => {
      const questions = [{ id: 1, content: "Question 1", user_id: 1 }];
      knexMock.select.mockResolvedValue(questions);

      await getQuestions(req, res);

      expect(knexMock.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(questions);
    });

    test("should handle errors when getting questions", async () => {
      const errorMessage = "Database error";
      knexMock.select.mockRejectedValue(new Error(errorMessage));

      await getQuestions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createQuestion", () => {
    test("should create a question successfully", async () => {
      req.body.content = "New Question";
      req.body.anonymous = false;
      req.user.id = 1;
      knexMock.insert.mockResolvedValue([1]);

      await createQuestion(req, res);

      expect(knexMock.insert).toHaveBeenCalledWith({
        content: "New Question",
        user_id: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Question created",
        id: 1,
      });
    });

    test("should handle errors when creating a question", async () => {
      req.body.content = "New Question";
      req.body.anonymous = false;
      req.user.id = 1;
      const errorMessage = "Database error";
      knexMock.insert.mockRejectedValue(new Error(errorMessage));

      await createQuestion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteQuestion", () => {
    test("should delete a question successfully", async () => {
      req.params.id = 1;
      knexMock.del.mockResolvedValue(1);

      await deleteQuestion(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Question deleted successfully",
      });
    });

    test("should handle errors when deleting a question", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.del.mockRejectedValue(new Error(errorMessage));

      await deleteQuestion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
