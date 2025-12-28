const calculateResult = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question, callback) {
  rl.question(question, answer => callback(answer));
}

ask("Student Name: ", name => {
  ask("English marks: ", english => {
    ask("Math marks: ", math => {
      ask("Science marks: ", science => {
        ask("Computer marks: ", computer => {

          const marks = [
            Number(english),
            Number(math),
            Number(science),
            Number(computer)
          ];

          const result = calculateResult(name, marks);

          console.log(`
Name: ${result.name}
Total: ${result.obtTotal}/${marks.length * 100}
Percentage: ${result.percentage}%
Grade: ${result.grade}
          `);

          rl.close();
        });
      });
    });
  });
});
