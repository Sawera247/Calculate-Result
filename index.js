const express = require('express');
const path = require('path');
const app = express();

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Result Route
app.get('/result', (req, res) => {
    const { name, math, english, science } = req.query;

    // Convert marks to numbers
    const mathMark = Math.min(parseFloat(math), 100);
    const englishMark = Math.min(parseFloat(english), 100);
    const scienceMark = Math.min(parseFloat(science), 100);

    // Calculate total and percentage
    const total = mathMark + englishMark + scienceMark;
    const percentage = (total / 300) * 100;

    // Calculate grade
    let grade = '';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    else grade = 'F';

    // Result object
    const result = {
        Name: name,
        Math: mathMark,
        English: englishMark,
        Science: scienceMark,
        Total: total,
        Percentage: percentage.toFixed(2) + '%',
        Grade: grade
    };

    console.log(result); // Show in terminal

    // Send result in browser
    res.send(`
        <!DOCTYPE html>
    <html>
    <head>
        <title>Student Result</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h1>Student Result</h1>
        <div>
        <table>
            <tr>
                <th>Subject</th>
                <th>Marks</th>
            </tr>
            <tr>
                <td>Math</td>
                <td>${result.Math}</td>
            </tr>
            <tr>
                <td>English</td>
                <td>${result.English}</td>
            </tr>
            <tr>
                <td>Science</td>
                <td>${result.Science}</td>
            </tr>
            <tr>
                <th>Total</th>
                <td>${result.Total}</td>
            </tr>
            <tr>
                <th>Percentage</th>
                <td>${result.Percentage}</td>
            </tr>
            <tr>
                <th>Grade</th>
                <td class="grade">${result.Grade}</td>
            </tr>
        </table>
        <a href="/"><button>Go Back</button></a>
        </div>
    </body>
    </html>
    `);
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
