# Catgreen Dashboard

[![balena deploy button](https://www.balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/MatthiasKainer/catgreen)


This is a dashboard that either shows your failing builds, or a random cat gif if there's nothing failing. So it's way of saying "all green" is showing a cat.

Supports currently

- Azure DevOps
- Github

## Usage

Open your bash and type in the following commands

```bash
# One time setup
./setup

# setup correct node version
nvm use
# download the internet
npm install
# start the app
npm run dev
# OR start the app, but really fast
npm start
```

After that, open your browser on the site <http://localhost:3000>.

In the `Org` field, add your Azure DevOps Organisation. In the `project` fields add a comma-separated list of projects. Hit `Enter` like **REALLY HARD**! You can also just click somewhere on the page, but hitting enter is cooler. Wait until the "wait" notification is gone, then either see a cat gif or the shame of red builds.

https://github.com/MatthiasKainer/catgreen/assets/2781095/31fff91b-f370-401a-9903-1a8c09455e1a

_behold the glory of a green dashboard!_

I'm actually not sure on the red builds, because I never have those. If you do, feel free to confirm or open an issue with the json response, including all your secrets and bitcoin wallets.
