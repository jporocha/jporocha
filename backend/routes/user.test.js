const app = require('../config/server.js')
const supertest = require('supertest')
const request = supertest(app)
const { setupDB } = require('./test-setup')

let userWasCreated = false

const databaseName = "testEnvironment"
setupDB(databaseName)

it("Testing JEST", () => {
    expect(1).toBe(1)
})

it("Async testing", async done => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 100)
})

it("Testing Hello World", async done => {
    const res = await request.get("/api/test")
    expect(res.status).toBe(200)
    done()
})

it("Testing create user", async done => {
    const res = await request.post("/api/users/").send({
        name: 'João Paulo Rocha',
        email: 'jporocha@gmail.com',
        password: 'testeDePass',
        role: 'Admin'
    })
    let statusCode = userWasCreated ? 400 : 201
    userWasCreated = true
    expect(res.status).toBe(statusCode)
    console.log('Resposta:', res.body)
    done()
})

it("Testing create user", async done => {
    const res = await request.post("/api/users/").send({
        name: 'João Paulo Rocha',
        email: 'jporocha@gmail.com',
        password: 'testeDePass',
        role: 'Admin'
    })
    let statusCode = userWasCreated ? 400 : 201
    userWasCreated = true
    expect(res.status).toBe(statusCode)
    console.log('Resposta:', res.body)
    done()
})

it("Testing login", async done => {
    const res = await request.post("/api/users/login").send({
        email: 'jporocha@gmail.com',
        password: 'testeDePass'
    })
    expect(res.status).toBe(200)
    console.log('Resposta:', res.body)
    done()
})