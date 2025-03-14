const express = require("express");
const cors = require("cors");
const marked = require("marked");

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for Markdown conversion
app.post("/convert", (req, res) => {
    const { markdown } = req.body;
    if (!markdown) return res.status(400).json({ error: "No markdown provided" });

    const html = marked.parse(markdown);
    res.json({ html });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
