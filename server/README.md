# Taipo server

Need to execute `npm run build` before using client, as it references some type definitions in the server.

## Deploying

**Heroku** was used to deploy the server

```bash
$ heroku login
$ heroku git:remote -a taipo-server
$ git subtree push --prefix server heroku main
```
