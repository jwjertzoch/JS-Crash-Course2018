import test from "ava";
import request from "supertest";
import app from "../app";

test("Get list of visitors", async t => {
  const creation = await request(app)
    .post("/visitors")
    .send({ 
      name: "Jenny"
    })

  const res = await request(app).get("/visitor/all")

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), "Body should be an array")
  t.true(res.body.length > 0)
})

test("Create new visitor", async t => {
  t.plan(2)
  const visitorToCreate = { name: "Jenny" }

  const res = await request(app)
    .post("/visitor")
    .send(visitorToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, visitorToCreate.name)
})

test("Fetch a visitor", async t => {
  t.plan(2)
  const visitorToCreate = { 
    name: "Jenny"
  }

  const jennyVisitorCreated = (await request(app)
    .post("/visitor")
    .send(visitorToCreate)).body

  const fetchRes = await request(app).get(
    `/visitor/${jennyVisitorCreated._id}/json`
  )

  const jennyVisitorFetched = fetchRes.body

  t.is(fetchRes.status, 200)
  t.deepEqual(jennyVisitorFetched, jennyVisitorCreated)
})

test("Delete a visitor", async t => {
  t.plan(1)

  const visitor = (await request(app)
    .post("/visitor")
    .send({ name: "Jenny" })).body

  const del = await request(app).delete(`/visitor/${visitor._id}`)

  // t.is(del.status, 200)
  // t.is(del.text, "ok!")

  const fetch = await request(app).get(`/visitor/${visitor._id}/json`)

  t.is(fetch.status, 404)
})
