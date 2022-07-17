const dotenv = require('dotenv')
const { Pool, Client } = require('pg')


const pool = new Pool({
	user: 'user',
	host: '',
	port: 5432,
	database: '2019_db',
	max: 10,
})

const db = {};

db.searchUser = async (email) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT "User_ID" as "ID",
					"User_Name" as "Name",
					"Password" as password,
					"Email_ID"as "Email",
					"Mobile_Number" as "Phone Number",
					"Plan_ID" as "Plan ID",
					"User_Type" as "isPremium"
			from "T9_OMMS"."User"
			where "Email_ID"='${email}'`,
			(err, res) => {
				if (err) {
					console.log(err);
					resolve({ password: '' });
				}
				else {
					console.log(res.rows);
					resolve(res.rows[0]);
				}
			});
	});
}

db.createUser = async (id, name, password, email, isPremium) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`INSERT INTO "T9_OMMS"."User"(
				"User_ID", "User_Name", "Password", "Email_ID", "Mobile_Number", "Plan_ID", "User_Type")
				VALUES ('${id}', '${name}', '${password}', '${email}', '0123456789', '3', '${isPremium}');`,
			(err, res) => {
				if (err) {
					console.log(err);
					resolve(false);
				}
				else {
					console.log(res);
					resolve(true);
				}
			});
	});
}

db.run = async (query) => {
	return new Promise((resolve, reject) => {
		pool.query(query, (err, res) => {
			if (err) {
				console.log(err);
				resolve(null);
			}
			else {
				console.log(res.rowCount);
				resolve(res);
			}
		});
	});
}

// pool.end()

module.exports = db;
