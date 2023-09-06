import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'signup'
});

//////for verifying

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authentication" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not okey" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });

})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES(?, ?, ?)";
    const values = [name, email, hashedPassword];

    db.query(sql, values, (err, result) => {
        if (err) {

            return res.json({ error: "Error inserting data into the Server" });
        }
        return res.json({ Status: "Success" });
    });
});

app.post("/login", (req, res) => {

    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "login error in server" });
        if (data.length > 0) {

            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error " });
                if (response) {

                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });     ///cookie expair in 1 day
                    res.cookie('token', token);

                    return res.json({ status: "Success" });
                } else {
                    return res.json({ Error: "Password not matched" });

                }
            })

        } else {
            return res.json({ Error: "No email existed" });

        }

    })
})



/////finally clearCookie

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})


app.listen(8000, () => {
    console.log("Running on port 8000");
});