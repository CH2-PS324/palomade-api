require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8004;

app.get("/", (req, res) => {
    res.status(200).json({
        teamName: "CH2-PS324",
        project: "palomade"
    });
})

app.listen(PORT, () => {
    console.log(`Server has successfully runned at http://localhost:${PORT}`);
});