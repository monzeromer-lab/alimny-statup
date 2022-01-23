// jest.useFakeTimers()

const server = require("../server"),
    supertest = require("supertest"),
    request = supertest(server)


// const getUserEmail = jest.fn()
describe('user router: POST /profile/register', () => {

    test('should response with 403', () => {
        request.post("/profile/register", (err, res) => {
            // console.log(err)
            // getUserEmail.mockReturnValueOnce([
            //     [{
            //         email: ""
            //     }],
            //     []
            // ])
            // expect(getUserEmail.mock.calls.length).toBe(1)
            // expect(res.body.error.state).toBe(true)
            expect(res.statusCode).toBe(403)

        });
    });
});