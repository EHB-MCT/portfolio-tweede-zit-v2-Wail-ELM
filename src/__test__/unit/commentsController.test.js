const {
  getComments,
  createComment,
  deleteComment,
} = require("../../controllers/commentsController");
const knex = require("config/knex");
jest.mock("config/knex");

describe("commentsController", () => {
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

  describe("getComments", () => {
    it("should get comments successfully", async () => {
      req.params.answerId = 1;
      const comments = [{ id: 1, content: "Comment 1", answer_id: 1 }];
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(comments),
        }),
      });

      await getComments(req, res);

      expect(knex("comments").where).toHaveBeenCalledWith({ answer_id: 1 });
      expect(knex("comments").where().select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    it("should handle errors when getting comments", async () => {
      req.params.answerId = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          select: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createComment", () => {
    it("should create a comment successfully", async () => {
      req.body.content = "New Comment";
      req.params.answerId = 1;
      req.user.id = 1;
      knex.mockReturnValue({
        insert: jest.fn().mockResolvedValue([1]),
      });

      await createComment(req, res);

      expect(knex("comments").insert).toHaveBeenCalledWith({
        content: "New Comment",
        answer_id: 1,
        user_id: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment created",
        id: 1,
      });
    });

    it("should handle errors when creating a comment", async () => {
      req.body.content = "New Comment";
      req.params.answerId = 1;
      req.user.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        insert: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment successfully", async () => {
      req.params.id = 1;
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockResolvedValue(1),
        }),
      });

      await deleteComment(req, res);

      expect(knex("comments").where).toHaveBeenCalledWith({ id: 1 });
      expect(knex("comments").where().del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment deleted successfully",
      });
    });

    it("should handle errors when deleting a comment", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
