const {
  getComments,
  createComment,
  deleteComment,
} = require("../../controllers/commentsController");

jest.mock("config/knex", () => () => ({
  where: jest.fn().mockReturnThis(),
  select: jest.fn(),
  insert: jest.fn(),
  del: jest.fn(),
}));

describe("commentsController", () => {
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

  describe("getComments", () => {
    test("should get comments successfully", async () => {
      req.params.answerId = 1;
      const comments = [{ id: 1, content: "Comment 1", answer_id: 1 }];
      knexMock.select.mockResolvedValue(comments);

      await getComments(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ answer_id: 1 });
      expect(knexMock.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    test("should handle errors when getting comments", async () => {
      req.params.answerId = 1;
      const errorMessage = "Database error";
      knexMock.select.mockRejectedValue(new Error(errorMessage));

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("createComment", () => {
    test("should create a comment successfully", async () => {
      req.body.content = "New Comment";
      req.params.answerId = 1;
      req.user.id = 1;
      knexMock.insert.mockResolvedValue([1]);

      await createComment(req, res);

      expect(knexMock.insert).toHaveBeenCalledWith({
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

    test("should handle errors when creating a comment", async () => {
      req.body.content = "New Comment";
      req.params.answerId = 1;
      req.user.id = 1;
      const errorMessage = "Database error";
      knexMock.insert.mockRejectedValue(new Error(errorMessage));

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteComment", () => {
    test("should delete a comment successfully", async () => {
      req.params.id = 1;
      knexMock.del.mockResolvedValue(1);

      await deleteComment(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment deleted successfully",
      });
    });

    test("should handle errors when deleting a comment", async () => {
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.del.mockRejectedValue(new Error(errorMessage));

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
