const { register, login } = require("../../controllers/authController");
describe("authController - Unit Tests", () => {
  test("should return error if email is missing during registration", async () => {
    req.body = {
      name: "John",
      password: "password",
      role: "user"
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Email is required" });
  });
});
