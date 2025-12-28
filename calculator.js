module.exports = function calculateResult(name, marks) {

    const obtTotal = marks.reduce((sum, value) => {
        return sum + value;
    }, 0);

    const maxTotal = marks.length * 100;
    const percentage = Number(((obtTotal / maxTotal) * 100).toFixed(2));

    let grade;

    if (percentage >= 80) {
        grade = 'A'
    }else if (percentage >= 70) {
        grade = 'B'
    }else if (percentage >= 60) {
        grade = 'C'
    }else if (percentage >= 50) {
        grade = 'D'
    }else {
        grade = 'F'
    }

    return { name, obtTotal, percentage, grade };
};
