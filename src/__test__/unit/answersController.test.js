const {
  getAnswers,
  createAnswer,
  markAnswerCorrect,
  deleteAnswer,
} = require("../../controllers/answersController");

jest.mock("config/knex", () => () => ({
  where: jest.fn().mockReturnThis(),
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  del: jest.fn(),
}));

describe("answersController", () => {
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

  describe("getAnswers", () => {
    test("should get answers successfully", async () => {
      req.params.questionId = 1;
      const answers = [{ id: 1, content: "Answer 1", question_id: 1 }];
      knexMock.select.mockResolvedValue(answers);

      await getAnswers(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ question_id: 1 });
      expect(knexMock.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(answers);
    });

    test("should handle errors when getting answers", async () => {
      req.params.questionId = 1;
      const errorMessage = "Database error";
      knexMock.select.mockRejectedValue(new Error(errorMessage));

      await getAnswers(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ question_id: 1 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createAnswer", () => {
    test("should create an answer successfully", async () => {
      req.body.content = "New Answer";
      req.params.questionId = 1;
      req.user.id = 1;
      knexMock.insert.mockResolvedValue([1]);

      await createAnswer(req, res);

      expect(knexMock.insert).toHaveBeenCalledWith({
        content: "New Answer",
        question_id: 1,
        user_id: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer created",
        id: 1,
      });
    });

    test("should handle errors when creating an answer", async () => {
      req.body.content = "New Answer";
      req.params.questionId = 1;
      req.user.id = 1;
      const errorMessage = "Database error";
      knexMock.insert.mockRejectedValue(new Error(errorMessage));

      await createAnswer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("markAnswerCorrect", () => {
    test("should mark an answer as correct successfully", async () => {
      req.params.id = 1;
      knexMock.update.mockResolvedValue(1);

      await markAnswerCorrect(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.update).toHaveBeenCalledWith({
        correct: true,
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer marked as correct",
      });
    });

    test("should handle errors when marking an answer as correct", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.update.mockRejectedValue(new Error(errorMessage));

      await markAnswerCorrect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteAnswer", () => {
    test("should delete an answer successfully", async () => {
      req.params.id = 1;
      knexMock.del.mockResolvedValue(1);

      await deleteAnswer(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer deleted successfully",
      });
    });

    test("should handle errors when deleting an answer", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.del.mockRejectedValue(new Error(errorMessage));

      await deleteAnswer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
