const {
  getAnswers,
  createAnswer,
  markAnswerCorrect,
  deleteAnswer,
} = require("../../src/controllers/answersController");
const knex = require("../../src/config/knex");

jest.mock("../../src/config/knex");

describe("answersController", () => {
  let req;
  let res;

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
  });

  describe("getAnswers", () => {
    it("should get answers successfully", async () => {
      req.params.questionId = 1;
      const answers = [
        { id: 1, content: "Answer 1", question_id: 1, user_id: 1 },
      ];
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(answers),
        }),
      });

      await getAnswers(req, res);

      expect(knex("answers").where).toHaveBeenCalledWith({ question_id: 1 });
      expect(res.json).toHaveBeenCalledWith(answers);
    });

    it("should handle errors when getting answers", async () => {
      req.params.questionId = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          select: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await getAnswers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createAnswer", () => {
    it("should create an answer successfully", async () => {
      req.body = { content: "Answer 1" };
      req.params.questionId = 1;
      req.user.id = 1;
      knex.mockReturnValue({
        insert: jest.fn().mockResolvedValue([1]),
      });

      await createAnswer(req, res);

      expect(knex("answers").insert).toHaveBeenCalledWith({
        content: "Answer 1",
        question_id: 1,
        user_id: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer created",
        id: 1,
      });
    });

    it("should handle errors when creating an answer", async () => {
      req.body = { content: "Answer 1" };
      req.params.questionId = 1;
      req.user.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        insert: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await createAnswer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("markAnswerCorrect", () => {
    it("should mark an answer as correct", async () => {
      req.params.id = 1;
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          update: jest.fn().mockResolvedValue(1),
        }),
      });

      await markAnswerCorrect(req, res);

      expect(knex("answers").where).toHaveBeenCalledWith({ id: 1 });
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer marked as correct",
      });
    });

    it("should handle errors when marking an answer as correct", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          update: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await markAnswerCorrect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteAnswer", () => {
    it("should delete an answer", async () => {
      req.params.id = 1;
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockResolvedValue(1),
        }),
      });

      await deleteAnswer(req, res);

      expect(knex("answers").where).toHaveBeenCalledWith({ id: 1 });
      expect(res.json).toHaveBeenCalledWith({
        message: "Answer deleted successfully",
      });
    });

    it("should handle errors when deleting an answer", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await deleteAnswer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
