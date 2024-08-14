const {
  findAll,
  findById,
  update,
  delete: deleteUser,
} = require("../../controllers/usersController");

// Mock de knex
jest.mock("config/knex", () => () => ({
  select: jest.fn(),
  where: jest.fn().mockReturnThis(),
  update: jest.fn(),
  del: jest.fn(),
  first: jest.fn(),
}));

describe("usersController", () => {
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
      sendStatus: jest.fn(),
    };

    knexMock = require("config/knex")();
  });

  describe("findAll", () => {
    test("should return all users for admin", async () => {
      req.user.role = "admin";
      const users = [{ id: 1, name: "John Doe" }];
      knexMock.select.mockResolvedValue(users);

      await findAll(req, res);

      expect(knexMock.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });

    test("should return 403 for non-admin users", async () => {
      req.user.role = "user";

      await findAll(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test("should handle errors when finding all users", async () => {
      req.user.role = "admin";
      const errorMessage = "Database error";
      knexMock.select.mockRejectedValue(new Error(errorMessage));

      await findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("findById", () => {
    test("should return user by id for admin", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const user = { id: 1, name: "John Doe" };
      knexMock.first.mockResolvedValue(user);

      await findById(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.first).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user);
    });

    test("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await findById(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test("should handle errors when finding user by id", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.first.mockRejectedValue(new Error(errorMessage));

      await findById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("update", () => {
    test("should update a user successfully", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      req.body = { name: "John Doe", email: "john@example.com", role: "user" };
      knexMock.update.mockResolvedValue(1);

      await update(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.update).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
      });
    });

    test("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await update(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test("should handle errors when updating a user", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      req.body = { name: "John Doe", email: "john@example.com", role: "user" };
      const errorMessage = "Database error";
      knexMock.update.mockRejectedValue(new Error(errorMessage));

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("delete", () => {
    test("should delete a user successfully", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      knexMock.del.mockResolvedValue(1);

      await deleteUser(req, res);

      expect(knexMock.where).toHaveBeenCalledWith({ id: 1 });
      expect(knexMock.del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    test("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await deleteUser(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test("should handle errors when deleting a user", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const errorMessage = "Database error";
      knexMock.del.mockRejectedValue(new Error(errorMessage));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
