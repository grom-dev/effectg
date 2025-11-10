### Publish to npm

- Configure TypeScript to build the project.
- Create GitHub workflow for building and publishing to npm.

### Routing mechanism

Implement mechanism for handling a single update and routing it to different handlers.

From grammY:

- `Composer` and `Middleware` are at the heart of the grammY routing
- `Composer.use(...middlewares)` — simply creates a new composer with a new handler
- `Composer.branch(predicate, route1, route2)` — used to branch between 2 possible routes depending on result of `predicate`
- `Composer.filter(predicate, route)` — a wrapper around `Composer.branch` to filter on update

Let's rename `Composer` to `Router` and `Middleware` to `Handler`.

### Long polling runner

Implement an efficient runner (similar to grammY runner) that would fetch and process incoming updates using long polling.

### File uploads

In `BotApiTransport`, add support for handling requests with `InputFile`s inside and transoforming them to `form-data` HTTP requests for uploading files to Bot API.

### FSM

Implement `Fsm` for building Finite State Machines.

Fsm should be configured with:

- How to read current state
- How to map an update to an event
- What are the states?
- What are the transitions? (state + event) => (action that returns state)
- How to save new state

Or maybe steps and waits? Similar to grammY scenes?

After configuring an `Fsm`, it will become a `Handler` and can handle an update.
