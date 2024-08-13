const {
  getQuestions,
  createQuestion,
  deleteQuestion,
} = require("../../controllers/questionsController");
const knex = require("config/knex");
jest.mock("config/knex");

describe("questionsController", () => {
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

  describe("getQuestions", () => {
    it("should get questions successfully", async () => {
      const questions = [{ id: 1, content: "Question 1", user_id: 1 }];
      knex.mockReturnValue({
        select: jest.fn().mockResolvedValue(questions),
      });

      await getQuestions(req, res);

      expect(knex("questions").select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(questions);
    });

    it("should handle errors when getting questions", async () => {
      const errorMessage = "Database error";
      knex.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await getQuestions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createQuestion", () => {
    it("should create a question successfully", async () => {
      req.body.content = "New Question";
      req.body.anonymous = false;
      req.user.id = 1;
      knex.mockReturnValue({
        insert: jest.fn().mockResolvedValue([1]),
      });

      await createQuestion(req, res);

      expect(knex("questions").insert).toHaveBeenCalledWith({
        content: "New Question",
        user_id: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Question created",
        id: 1,
      });
    });

    it("should handle errors when creating a question", async () => {
      req.body.content = "New Question";
      req.body.anonymous = false;
      req.user.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        insert: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await createQuestion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteQuestion", () => {
    it("should delete a question successfully", async () => {
      req.params.id = 1;
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockResolvedValue(1),
        }),
      });

      await deleteQuestion(req, res);

      expect(knex("questions").where).toHaveBeenCalledWith({ id: 1 });
      expect(knex("questions").where().del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Question deleted successfully",
      });
    });

    it("should handle errors when deleting a question", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await deleteQuestion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
