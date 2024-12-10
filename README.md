This is a minimal repo to demonstrate an issue with the query attribute in express api endpoints in montiapm agent. Steps to reproduce:

  - `meteor npm install`
  - Run `meteor npm run test` => Everything's fine (`req.query` is `{}`)
  - Run `meteor add montiapm:profiler@1.7.0-beta.2`
  - Run `meteor npm run test` => `req.query` is `undefined`

Even though this setup is a bit awkward (since you could use `WebApp` over a separate `express` module), including montiapm agent shouldn't break API requests.