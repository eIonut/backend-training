# Recap · Lab 0.1

Answer in your own words, right here under each question. Short is fine. These are the kind of questions you'd
get in a backend interview.

1. Why do teams pin the Node version, and in how many places does that version matter for one project?

   > They pin it to have the same version all over the places to have a better view and to avoid security vulnerabilities.

2. Your app reads its port from `--port`, from `PORT`, and has a default of `3000`. Someone runs
   `PORT=8080 node app.js --port 9000`. Which port is used, and why is that the sensible rule?

   > In the app the command line argument is the most specific source, then the env and then the default.

3. A script prints a report and also some progress messages. Someone runs `node report.js > report.txt`. Which
   messages should end up in the file, which on the screen, and how does the program decide?

   > Console log > stdout, console error > std error, > only redirects stdout.

4. A background worker catches an error, logs it, and exits with code 0. What goes wrong in production?

   > In production exit code 0 counts as success so the system isn't aware that there was an error which would have probably needed to crash the app.

5. In your own words: what's the difference between an image and a container? What does the bind mount in
   `docker-compose.yml` do?

   > A container is a running instance of an image. An image is the definition of how a container should run. A bind mount makes it possible so that some files in your pc is syncronized with files in a container.
