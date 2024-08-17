const { findAll } = require("../../controllers/usersController");

describe("findAll - Unit Tests", () => {
  test("should return 403 if the user is not an admin", async () => {
    const req = {
      user: { role: "user" },
    };
    const res = {
      sendStatus: jest.fn(),
    };

    await findAll(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  // Add more unit tests as needed for local logic
});
