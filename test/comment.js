import test from "ava";
import request from "supertest";
import app from "../app";

test("Get list of comments", async t => {

  const createdVisitor = (await request(app)
  .post("/visitor")
  .send({ 
    name: 'Jenny' 
  })).body

  const createdToilet = (await request(app)
  .post("/toilet")
  .send({
    name: 'Turmstraße',
    location: 'Berlin'
  })).body
  
  const commentToCreate = {
    title: "Dirty!",
    description: "Would not visit again!",
    toilet: createdToilet._id,
    commentedBy: createdVisitor._id
  }

  const creation = await request(app)
    .post("/comment")
    .send(commentToCreate)

  const res = await request(app).get("/comment/all")

  t.is(res.status, 200);
  t.true(Array.isArray(res.body), "Body should be an array")
  t.true(res.body.length > 0)
})

test("Create new comment", async t => {
  t.plan(3);

  const createdVisitor = (await request(app)
  .post("/visitor")
  .send({ 
    name: 'Jenny' 
  })).body

  const createdToilet = (await request(app)
  .post("/toilet")
  .send({
    name: 'Turmstraße',
    location: 'Berlin'
  })).body

  const commentToCreate = {
    title: 'Dirty!',
    description: 'Would not visit again!',
    toilet: createdToilet._id,
    commentedBy: createdVisitor._id
  }

  const res = await request(app)
    .post("/comment")
    .send(commentToCreate);

  t.is(res.status, 200);
  t.is(res.body.title, commentToCreate.title);
  t.is(res.body.description, commentToCreate.description);
});

test("Fetch a comment", async t => {
  t.plan(2);

  const createdVisitor = (await request(app)
  .post("/visitor")
  .send({ 
    name: 'Jenny' 
  })).body

  const createdToilet = (await request(app)
  .post("/toilet")
  .send({
    name: 'Turmstraße',
    location: 'Berlin'
  })).body

  const commentToCreate = {
    title: "Dirty!",
    description: "Would not visit again!",
    toilet: createdToilet._id,
    commentedBy: createdVisitor._id
  };

  const commentCreated = (await request(app)
    .post("/comment")
    .send(commentToCreate)).body;

  const fetchRes = await request(app).get(
    `/comment/${commentCreated._id}/json`)

  const commentFetched = fetchRes.body

  t.is(fetchRes.status, 200)
  t.deepEqual(commentFetched, commentCreated)
})

