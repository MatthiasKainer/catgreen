# Catgreen Dashboard

[![balena deploy button](https://www.balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/MatthiasKainer/catgreen)

This is a dashboard that either shows your failing builds, or a random cat gif if there's nothing failing. So it's way of saying "all green" is showing a cat.

Supports currently

- Azure DevOps
- Github

## Usage

Open your bash and type in the following commands

```bash
# setup correct node version
nvm use
# download the internet
npm install
# start the app
npm run dev
# OR start the app, but really fast
npm start
# OR start the app but in a container
docker build -f Dockerfile.dev -t catgreen . && \
    docker run -it --env-file .env -p 3000:3000 catgreen:latest
```

After that, open your browser on the site <http://localhost:3000>.

In the `list of pipeline sources` field, add the list of github projects or azure devops orgs. In the `Filter` fields add a comma-separated list of filters, following the tooltip. Hit `Enter` like **REALLY HARD**! You can also just click somewhere on the page, but hitting enter is cooler. Wait until the "wait" notification is gone, then either see a cat gif or the shame of red builds.

https://github.com/MatthiasKainer/catgreen/assets/2781095/31fff91b-f370-401a-9903-1a8c09455e1a

_behold the glory of a green dashboard!_

I'm actually not sure on the red builds, because I never have those. If you do, feel free to confirm or open an issue with the json response, including all your secrets and bitcoin wallets.

### Pipeline sources

Pipeline sources follow a specific convention:

>  pipeline-provider:repos-reference

For the different providers, that leads to the following urls:

| Platform     | Syntax                   | Description                               |
| ------------ | ------------------------ | ----------------------------------------- |
| Azure DevOps | ado:organization/project | This will load all repos from the project |
| Github       | gh:owner                 | This will load all repos from the owner   |
| Gitlab       | gl:path                 | This will load all projects for this path   |

You can combine multiple sources simply by writing them as a comma separated list.

#### Examples

Example GitHub, https://github.com/MatthiasKainer
> gh:MatthiasKainer

Example Azure DevOps: https://dev.azure.com/MatthiasKainer/private/_build
> ado:MatthiasKainer/private

Both of the above in one view
> gh:MatthiasKainer,ado:MatthiasKainer/private

Example gitlab, everything under gitlabs own security products
> gl:gitlab-org/security-products

### Filters

To filter, add the filter statement in the form

> field:query

Possible fields are
  - id
  - name
  - result ("unknown" | "failed" | "success" | "running")
  - meta.triggerReason
  - meta.blame
  - link
  - timestamp

Fields can be combined and repeated by placing a special secret character (,) between them. Combining two fields will `AND` them, repeating one field will `OR` it.

#### Examples

Find all with the ID 1 or 2

> id:1, id:2

Find all with the ID 1 or 2 and by Matthias Kainer

> id:1, id:2, meta.blame:Matthias Kainer

Find all with the ID 1 or 2 that were successful and by Matthias Kainer

> id:1, id:2, meta.blame:Matthias Kainer, result: success

**NOTE**: Results will always add the failed builds (because that's what this is about). If you toggled the "Show running builds", those will be added as well, independent of the filter.
