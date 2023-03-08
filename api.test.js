const {describe, it} = require('mocha') 
//mocha => motor de testes
//import o describe e o it do pacote mocha (necessario instalar npm i -D mocha@8)
const app = require('./api')
const request = require('supertest') // Para fazer o End to End (vai subir o servidor na porta 3000 e vai requisitar a api naquela porta)
const assert = require('assert')

describe('API Suite test', () => {
    describe('/contact', () => { //Objetivo quando bater na rota retornar 200
        it('should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
                            .get('/contact')
                            .expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async() => {
            const response = await request(app)
            .get('/hi').expect(200)
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app)
            .post('/login')
            .send({username: "wesley", password: "123"})
            .expect(200)
            assert.deepStrictEqual(response.text, 'Loggin has success!')
        })
    })

    describe('/login', () => {
        it('should unauthorize a request when requesting it using wrong credenctials and return HTTP Status 401 ', async() => {
            const response = await request(app)
            .post('/login')
            .send({username: "xuxadasilva", password: "123"})
            .expect(401)
            
            assert.ok(response.unauthorized)

            assert.deepStrictEqual(response.text, 'Logging failed!')
        })
    })
})