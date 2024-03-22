Hello, this is my monoRepo e-store project. This project is a continuation of the sprint 2.4.5 capstone, so the front-end is from that. You can check the README in packages/client to understand where that was left off. For 3.3.5, I did not work on the front-end.

This part is hard to evaluate because all I have is a database connection, a way to log in and register a user (as well as check for the authorizations of the users), and every function I think I’ll need to connect and obtain the information from the front-end.

To check this part’s progress from the directory of this README, you can type:
(dont forget to create your own env file)

cd packages/server
npm run test:mem

To check the coverage you may type:
npm run coverage:mem

to run the coverage without the need to create a new database

This will create an in-memory database for testing, so there’s no need to actually connect to a PostgreSQL database for this review. I’m hoping to be able to do this also in the next part to generate random products to showcase the front-end. If you want to take a look at the front-end, you can also, from the directory of this file, type:

cd package/client
npm run dev

It is connected to dummyJson API, so it shows you items you can buy/play around with.

I hope you enjoy this project.
