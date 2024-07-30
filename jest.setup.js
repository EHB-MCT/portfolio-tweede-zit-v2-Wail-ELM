jest.setTimeout(30000);

afterAll(done => {
    if (global.server && global.server.close) {
      global.server.close(done);
    } else {
      done();
    }
  });
  