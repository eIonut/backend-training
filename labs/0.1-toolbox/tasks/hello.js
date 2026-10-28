// Lab 0.1 · T2 · The process contract
//
// Run it from the project root:
//   node labs/0.1-toolbox/tasks/hello.js Ana
//   NAME=Ionut node labs/0.1-toolbox/tasks/hello.js
//
// Rules (see the table in the README):
//   - name = first command-line argument, else the NAME env var, else "backend"
//   - print "Hello, <name>!" to stdout
//   - if an argument is given but it is an empty string, print an error to stderr,
//     print nothing to stdout, and end with exit code 1

// TODO 1: read the first argument (remember: your arguments start at index 2)
const argv1 = process.argv[2];
// TODO 2: decide the name, following the precedence rule
const name = argv1 || process.env.NAME || "backend";
// TODO 3: handle the empty-argument case (stderr + exit code 1)
if (argv1 === "") {
  console.error("Provide a non-empty argument");
  process.exit(1);
}
// TODO 4: print the greeting
console.log(`Hello, ${name}!`);
