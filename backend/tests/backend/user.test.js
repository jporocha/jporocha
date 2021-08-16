const app = require('../../backend/config/server')
const supertest = require('supertest')
const request = supertest(app)
const { setupDB } = require('./test-setup')

const databaseName = "testEnvironment"

setupDB(databaseName)

it("Testing JEST", () => {
    expect(1).toBe(1)
})

it("Testing Hello World", async done => {
    const res = await request.get("/api/test")
    expect(res.status).toBe(200)
    done()
})

it("Testing create user", async done => {
    const res = await request.post("/api/users/createUser").send({
        name: 'João Paulo Rocha',
        email: 'jporocha@gmail.com',
        password: 'testeDePass',
        role: 'Admin'
    })
    expect(res.statusCode).toBe(201)
    done()
})

it("Testing create second user", async done => {
    const res = await request.post("/api/users/createUser").send({
        name: 'João Paulo Rocha',
        email: 'jporocha@globo.com',
        password: 'testeDePassword',
        role: 'Admin'
    })
    expect(res.statusCode).toBe(201)
    done()
})

it("Testing create user already in DB", async done => {
    const res = await request.post("/api/users/").send({
        name: 'João Paulo Rocha',
        email: 'jporocha@gmail.com',
        password: 'testeDePass',
        role: 'Admin'
    })
    expect(res.statusCode).toBe(404)
    done()
})

it("Testing login", async done => {
    const res = await request.post("/api/users/login").send({
        email: 'jporocha@gmail.com',
        password: 'testeDePass'
    })
    expect(res.statusCode).toBe(201)
    done()
})