const userservices = require('../../src/services/user.services');
const User = require('../../src/models/1-user');
const database = require('../../src/config/database');

beforeAll(async () => {
	await database.sync();
});

beforeEach(async () => {
	await User.destroy({where:{}});
	await User.bulkCreate([
		{
			id:1,
			name: 'ahmed',
			email:'ahmed@mail.com',
			password: 'password',
			phone: "0126975878"
		},
		{
			id:2,
			name: 'momen_d',
			email:'meomen_d@mail.com',
			password: 'password',
			phone: "0126975878"
		},
	]);
});

it('Should return all users from the database', async () => {
	const users = await userservices.getUsers();
	expect(users).toEqual(expect.any(Array));
})

it('Should create a new user', async () => {
	const userData = {
		name: "momen",
		email: 'momen@mail.com',
		password: '12133',
		phone: '023323838'
	};
	const createdUser = await userservices.store(userData);
	expect(createdUser.name).toBe(userData.name);
	expect(createdUser.email).toBe(userData.email);
})

it('Should get a single user if it exits', async () => {
	const user = await userservices.getUser(1);
	if(user) {
		expect(user.name).toEqual('ahmed');	
	}
})

it('Should throw an error when trying to search for unexisting user', async () => {
	const user = await userservices.getUser(89);
	await expect(user).toBe(false);
})

it('Should update an existing user', async () => {
	data = {
		name: "Mohmmed",
		email: "mohmmed@email.com"
	};
	const user = await userservices.update(1,data);
	expect(user.name).toEqual("Mohmmed")
	expect(user.email).toEqual("mohmmed@email.com")
	expect(user.phone).toEqual(126975878)
})

it("Should delete an existing user", async () => {
	const deleted = await userservices.delete(1);
	expect(deleted).toBe(true);
})

it("Should returns false value when trying to delete unexisting user", async () => {
	const deleted = await userservices.delete(9);
	expect(deleted).toBe(false);
})