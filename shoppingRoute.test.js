process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");

let items = require("./fakeDb");

let potato = { name: "potato"};

beforeEach(function() {
    items.push(potato);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([potato]);
    })
})

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${potato.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({name: potato.name});
    })

    test("Return 404 if item is missing", async () => {
        const res = await request(app).get(`/items/carrot`);
        expect(res.statusCode).toBe(404);
    })

describe("POST /items", () => {
    test("Adding an item", async () => {
        const res = await request(app).post(`/items`).send( {name: 'carrot', price: 1.45});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual("{added: {name: carrot, price: 1.45}}" );
    })

    test("Return 404 if missing name", async () => {
        const res = await request(app).post(`/items`).send({});
        expect(res.statusCode).toBe(404);
    })
})

describe("PATCH /items/:name", () => {
    test("Patch an item", async () => {
        const res = await request(app).patch(`/items/${potato.name}`).send({name: "carrot"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name: "carrot"}});
    })

    test("Return 404 if item not found", async () => {
        const res = await request(app).post(`/items/chips`).send({name: "carrot"});
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("Delete an item", async () => {
        const res = await request(app).delete(`/items/${potato.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    })

    test("Return 404 if item not found", async () => {
        const res = await request(app).delete(`/items/chips`);
        expect(res.statusCode).toBe(404);
    })
})

})
