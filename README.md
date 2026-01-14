# Hiking backend

this is a typescript project, so the main pre-req is to have npm (node package manager) and Nodejs installed on your machine. you can confirm you have node and nvm by running `node -v` and `npm -v` in your terminal. 

steps to get started:
1. clone the repo. cd to your preferred development directory (example: home/projects/) and enter `git clone https://github.com/dallinmoak/hiking-backend.git` or `git clone git@github.com:dallinmoak/hiking-backend.git` for ssh connections. 

2. install dependencies by cd-ing into the project and running `npm i`.

3. get a neondb connection string. visit neon.tech to do it, and if you wanna connect to the production neon db, contact me for the connection string. enter the connection string in `./.env` as `DB_URL=connection_string_here`

4. run the database generation script if you're not using the prod connection string: `npm run db:generate` and then `npm run db:push`.

5. instead of running the app as a simulated vercel app, you can just run `npm run dev` or `pnpm run dev` to trigger the tcs (typsecript transpiler) compile command i set up.

## optional

I set up this ORM (object relation model) called Drizzle, and it has a dashboard that can be started up locally with `npm run db:studio`. this dashboard looks almost identical to the neon dashboard.
