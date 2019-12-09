const bfInt = require("./src/interpreter");
const bfRInt = require("./src/reverse-interpreter");
const dictionary = require("./src/command-dictionary");

const program =
`>+++++++[<++++++++++>-]<++>
>++++++++++[<++++++++++>-]<+>
>++++++++++[<++++++++++>-]<++++++++>
>++++++++++[<++++++++++>-]<++++++++>
>+++++++++++[<++++++++++>-]<+>
>+++[<++++++++++>-]<++>
>++++++++[<++++++++++>-]<+++++++>
>+++++++++++[<++++++++++>-]<+>
>+++++++++++[<++++++++++>-]<++++>
>++++++++++[<++++++++++>-]<++++++++>
>++++++++++[<++++++++++>-]
>+++[<++++++++++>-]<+++>
<<<<<<<<<<<<.>.>.>.>.>.>.>.>.>.>.>.`;

bfInt.interpret(program, dictionary);

const text = "Hello World!";

const generatedProgram = bfRInt.generateProgram(text, dictionary, true);

console.log(generatedProgram);

console.log(`Same? ${program === generatedProgram}`);
