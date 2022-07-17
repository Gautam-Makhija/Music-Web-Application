const express = require('express')
const path = require('path')
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const db = require('./utility')

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwtSecret = '';

//unprotected routes

app.post('/api/signin', (req, res) => {
	const { email, password } = req.body;

	searchUser(email, password, ({ user, msg }) => {
		token = user ? jsonwebtoken.sign({ user }, jwtSecret, { expiresIn: '3h' }) : null;
		res.json({ msg, user, token });
	})
})


app.post('/api/signup', (req, res) => {
	const { name, password, email } = req.body;

	searchUser(email, password, async ({ isUserExist }) => {
		if (!isUserExist) {
			const { rows } = await db.run(`SELECT COUNT("User_ID") FROM "T9_OMMS"."User"`);
			const status = await db.createUser(rows[0].count+1, name, password, email, 'Premium');
			console.log(status);

			if (status) {
				const newUser = {
					"Name": name,
					"Email": email,
					"isPremium": "Premium"
				};

				token = jsonwebtoken.sign({ newUser }, jwtSecret, { expiresIn: '3h' });
				res.json({ user: newUser, token });
			}
			else {
				res.json({ user: null, msg: "Server error" });
			}
		}
		else {
			res.json({ msg: "Already user exist", user: null });
		}
	})
})

app.use(jwt({
	secret: jwtSecret,
	getToken: req => {
		if(req.headers.authorization.split(" ").length == 2) {
			console.log(req.headers.authorization.split(" ")[1]);
			return req.headers.authorization.split(" ")[1];
		}
		return null;
	},
	algorithms: ['HS256']
}), (err, req, res, next) => {
	if (!err) {
		next();
	}
	else {
		res.json({ error: true, auth: false, user: null });
	}
});

//protected routes

app.get('/api/logout', (req, res) => {
	res.json({ msg: "done" });
});

app.get("/api/profile", (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const { user } = jsonwebtoken.verify(token, jwtSecret);
	res.json({ user });
})


app.post("/api/changePass", (req, res) => {
	const { password } = req.body;
	const token = req.headers.authorization.split(" ")[1];
	const { user } = jsonwebtoken.verify(token, jwtSecret);

	const query = `
		UPDATE 	"T9_OMMS"."User"
		SET 	"Password"='${password}'
		WHERE	"Email_ID"='${user.Email}'`;

	db.run(query)
		.then(() => {
			res.json({ msg: "done" });
		})
})

app.get("/api/deleteAccount", (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const { user } = jsonwebtoken.verify(token, jwtSecret);

	const query = `
		DELETE FROM "T9_OMMS"."User"
		WHERE "Email_ID"='${user.Email}'`;

	db.run(query)
		.then(() => {
			res.json({ msg: "done" });
		})
})

app.get("/api/songs", (req, res) => {

	var query = `
		SELECT	"Music_Name" as "Name",
				"Artist_Name" as "Artist",
				"Likes",
				"Views",
				"Company_Name" as "Production Name",
				"Music_Type" as "Type",
				"Music_Language" as "Language"

		FROM 	"T9_OMMS"."Music" natural join "T9_OMMS"."Artist" natural join "T9_OMMS"."Production_Company"
		LIMIT 30`

	db.run(query)
		.then(data => {
			res.json({songs: data.rows});
		})
})

app.listen(PORT, () => {
	console.log("Listening...");
});

async function searchUser(email, pass, callback) {
	const data = await db.searchUser(email)

	if (data) {
		var { password, ...user } = data;
	}
	else {
		var user = null;
	}

	if (user == null) {
		return callback({
			msg: "User not found",
			isUserExist: false,
			user: null,
		})
	}

	if (password !== pass) {
		return callback({
			msg: "Invalid credentials",
			isUserExist: true,
			user: null,
		})
	}

	return callback({
		msg: "User exist",
		isUserExist: true,
		user: user,
	})
}
