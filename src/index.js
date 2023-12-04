require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const { errors } = require('celebrate');
const { initializeDatabase } = require("./models/");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errors())

app.get("/", (req, res) => {
    res.status(200).json({
        teamName: "CH2-PS324",
        project: "Palomade - [Palm Oil Maturaty Detection]"
    });
})

// users route
require("./routes/user.route.js")(app);

// starting server
const startServer = async () => {
    try {
        await initializeDatabase();

        // Start server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error(
            "Server failed to start due to database initialization error:",
            error.message
        );
    }
};

startServer();