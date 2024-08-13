const {
  findAll,
  findById,
  update,
  delete: deleteUser,
} = require("../../controllers/usersController");
const knex = require("config/knex");
jest.mock("config/knex");

describe("usersController", () => {
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
      sendStatus: jest.fn(),
    };
  });

  describe("findAll", () => {
    it("should return all users for admin", async () => {
      req.user.role = "admin";
      const users = [{ id: 1, name: "John Doe" }];
      knex.mockReturnValue({
        select: jest.fn().mockResolvedValue(users),
      });

      await findAll(req, res);

      expect(knex("users").select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 403 for non-admin users", async () => {
      req.user.role = "user";

      await findAll(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it("should handle errors when finding all users", async () => {
      req.user.role = "admin";
      const errorMessage = "Database error";
      knex.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("findById", () => {
    it("should return user by id for admin", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const user = { id: 1, name: "John Doe" };
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(user),
        }),
      });

      await findById(req, res);

      expect(knex("users").where).toHaveBeenCalledWith({ id: 1 });
      expect(knex("users").where().first).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await findById(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it("should handle errors when finding user by id", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await findById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("update", () => {
    it("should update a user successfully", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      req.body = { name: "John Doe", email: "john@example.com", role: "user" };
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          update: jest.fn().mockResolvedValue(1),
        }),
      });

      await update(req, res);

      expect(knex("users").where).toHaveBeenCalledWith({ id: 1 });
      expect(knex("users").where().update).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
      });
    });

    it("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await update(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it("should handle errors when updating a user", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      req.body = { name: "John Doe", email: "john@example.com", role: "user" };
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          update: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("delete", () => {
    it("should delete a user successfully", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockResolvedValue(1),
        }),
      });

      await deleteUser(req, res);

      expect(knex("users").where).toHaveBeenCalledWith({ id: 1 });
      expect(knex("users").where().del).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    it("should return 403 if not admin or user himself", async () => {
      req.user.role = "user";
      req.user.id = 2;
      req.params.id = 1;

      await deleteUser(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it("should handle errors when deleting a user", async () => {
      req.user.role = "admin";
      req.params.id = 1;
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          del: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
