# Hiking backend

this is a typescript project, so the main pre-req is to have npm or pnpm installed. (i use & recommend pnpm). Also needed is typescript. 

steps to get started:
1. clone the repo. cd to your preferred development directory (example: home/projects/) and enter `git clone https://github.com/dallinmoak/hiking-backend.git` or `git clone git@github.com:dallinmoak/hiking-backend.git` for ssh connections. 

2. install dependencies by cd-ing into the project and running `npm i` or `pnpm i`.

3. get a neondb connection string. visit neon.tech to do it, and if you wanna connect to the production neon db, contact me for the connection string. enter the connection string in `./.env` as `DB_URL=connection_string_here`

3. instead of running the app as a simulated vercel app, you can just run `npm run dev` or `pnpm run dev` to trigger the tcs compile command i set up.

## optional

I set up this ORM called Drizzle, and it has a dashboard that can be started up locally with `npm run db:studio`. this dashboard looks almost identical to the neon dashboard.