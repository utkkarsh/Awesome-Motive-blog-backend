const app = require("../index"); // Link to your server file
const { v4: uuidv4 } = require("uuid");
const supertest = require("supertest");
require("dotenv").config();
const mongoose = require("mongoose");

/*
      declare the token variable in a scope accessible
      by the entire test suite
*/
let tokenResponse;

beforeEach((done) => {
  mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Post Journey", () => {
  it("Check if GET /posts working", async () => {
    await supertest(app)
      .get("/posts")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("Check if GET /posts/:postId working", async () => {
    await supertest(app)
      .get("/posts/61db4a5423e0a9cd96c40e10")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("GET requests /posts/:postId shouldn't work with invalid postId", async () => {
    await supertest(app)
      .get("/posts/c40e10")
      .expect(400)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
        expect(response.body.error.message).toEqual("Invalid PostId");
      });
  });

  it("GET requests /posts/:postId with valid postId but not present in DB", async () => {
    await supertest(app)
      .get("/posts/61de29735e99d9ff01449d80")
      .expect(404)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
        expect(response.body.error.message).toEqual("Posts Not Found!");
      });
  });

  it("POST request /posts shouldn't work without post title", async () => {
    const data = {
      content: "This would be my test content.",
    };

    await supertest(app).post("/posts").send(data).expect(422);
  });

  it("POST request /posts shouldn't work without post body/content", async () => {
    const data = {
      title: "My Test Article",
    };

    await supertest(app).post("/posts").send(data).expect(422);
  });

  it("POST request /posts should work with valid request", async () => {
    const data = {
      title: "My Test Article - " + uuidv4(),
      content: "This would be my test content.",
    };

    await supertest(app).post("/posts").send(data).expect(200);
  });

  it("POST request /posts shouldn't work with duplicate article name", async () => {
    const data = {
      title: "My Test Article",
      content: "This would be my test content.",
    };

    await supertest(app).post("/posts").send(data).expect(409);
  });
});

describe("Comment Journey", () => {
  it("Check if GET /comments/:postId working", async () => {
    await supertest(app)
      .get("/comments/61db4a5423e0a9cd96c40e10")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("Check if GET /comments/nested/:postId working", async () => {
    await supertest(app)
      .get("/comments/nested/61db4a5423e0a9cd96c40e10")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("GET requests /comments/:postId shouldn't work with invalid postId", async () => {
    await supertest(app)
      .get("/comments/c40e10")
      .expect(400)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
        expect(response.body.error.message).toEqual("Invalid PostId");
      });
  });

  it("GET requests /comments/nested/:postId shouldn't work with invalid postId", async () => {
    await supertest(app)
      .get("/comments/nested/c40e10")
      .expect(400)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
        expect(response.body.error.message).toEqual("Invalid PostId");
      });
  });

  it("POST request /comments should work without parentId", async () => {
    const data = {
      postId: "61dab40df549b2d3ef655c4e",
      user: "Utkarsh Sharma",
      comment: "This is a test comment.",
    };

    await supertest(app).post("/comments").send(data).expect(200);
  });

  it("POST request /comments should not work without postId", async () => {
    const data = {
      parentId: "61dad2ca1a4809d6d36992fb",
      user: "Utkarsh Sharma",
      comment: "This is a test comment.",
    };

    await supertest(app).post("/comments").send(data).expect(422);
  });

  it("POST request /comments shouldn't work without user name", async () => {
    const data = {
      postId: "61dab40df549b2d3ef655c4e",
      parentId: "61dad2ca1a4809d6d36992fb",
      comment: "This is a test comment.",
    };

    await supertest(app).post("/comments").send(data).expect(422);
  });

  it("POST request /comments shouldn't work without user comment", async () => {
    const data = {
      postId: "61dab40df549b2d3ef655c4e",
      parentId: "61dad2ca1a4809d6d36992fb",
      user: "Utkarsh Sharma",
    };

    await supertest(app).post("/comments").send(data).expect(422);
  });
});

describe("Non-Existing Route Journey", () => {
  it("Check if GET /other working", async () => {
    await supertest(app).get("/other").expect(404);
  });
});

describe("Check routes when DB connection is broken.", () => {
  it("GET /posts should return status-code 500 when DB connection is closed ", async () => {
    await mongoose.connection.close();
    await supertest(app).get("/posts").expect(500);
  });

  it("GET /posts/:postId should return status-code 500 when DB connection is closed ", async () => {
    await mongoose.connection.close();

    await supertest(app)
      .get("/posts/61db4a5423e0a9cd96c40e10")
      .expect(500)
      .then(async (response) => {
        // Check the response
        console.log(response.body);
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /comments should return status-code 500 when DB connection is closed ", async () => {
    await mongoose.connection.close();
    await supertest(app).get("/comments/61db4a5423e0a9cd96c40e10").expect(500);
  });

  it("GET /comments should return status-code 500 when DB connection is closed ", async () => {
    await mongoose.connection.close();

    await supertest(app)
      .get("/comments/nested/61db4a5423e0a9cd96c40e10")
      .expect(500);
  });
});
