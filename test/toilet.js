import test from "ava";
import request from "supertest";
import app from "../app";

test("Get list of toilets", async t => {
  const toiletToCreate = {
    name: "Turmstraße",
    location: "Berlin",
    vistors: [],
    comments: []
  }

  const creation = await request(app)
    .post("/toilets")
    .send(toiletToCreate)

  const res = await request(app).get("/toilet/all")

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), "Body should be an array")
  t.true(res.body.length > 0)
});

test("Create new toilet", async t => {
  t.plan(3)
  const toiletToCreate = {
    name: "Turmstraße",
    location: "Berlin"
  }

  const res = await request(app)
    .post("/toilet")
    .send(toiletToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, toiletToCreate.name)
  t.is(res.body.location, toiletToCreate.location)
})

test("Fetch a toilet", async t => {
  t.plan(2)
  const toiletToCreate = {
    name: "Turmstraße",
    location: "Berlin"
  }

  const toiletCreated = (await request(app)
    .post("/toilet")
    .send(toiletToCreate)).body

  const fetchRes = await request(app).get(
    `/toilet/${toiletCreated._id}/json`)

  const toiletFetched = fetchRes.body

  t.is(fetchRes.status, 200)
  t.deepEqual(toiletFetched, toiletCreated)
})

test("Delete a toilet", async t => {
  t.plan(1)

  const toiletToCreate = {
    name: "Turmstraße",
    location: "Berlin"
  }

  const toilet = (await request(app)
    .post("/toilets")
    .send(toiletToCreate)).body

  const del = await request(app).delete(`/toilets/${toilet._id}`)
  // t.is(del.status, 200)
  // t.is(del.text, "ok!")

  const fetch = await request(app).get(`/toilets/${toilet._id}/json`)

  t.is(fetch.status, 404)
})
