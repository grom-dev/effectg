Effectful library for crafting Telegram bots.

> [!WARNING]
> Work in progress.

## Features

- Effectful and typesafe API.
- Up-to-date and documented Bot API methods and types.

## Example

Let's start with a practical example: crafting a bot that would ...

## Usage

### Services

- `BotApi` service is a typesafe interface to all Bot API methods.
  It requires `BotApiTransport` service in order to communicate to the Bot API.
- `BotApiTransport` service provides a way to communicate to Bot API.

### Sending Messages

Bot API is essentially an "HTTP wrapper" around TDLib created to simplify lives of the developers who want to create a bot. But if we want to better understand the ..., we need to dig a bit deeper.

Messages on Telegram are sent using TDLib's [`sendMessage`](https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1send_message.html) method. By looking at `sendMessage`, we can see that in order to send a message, we need to know 5 things:

1. Content — content of the message to be sent.
2. Destination — where the message should be sent.
3. Reply options — information about replied message, if the message is a reply (optional).
4. Reply markup — markup for replying to the message (optional).
5. Send options — options to be used when sending the message (optional).

`sendMessage` function is a higher-level API for sending messages of any kind.

```ts
Tg.sendMessage({
  content: /* Content */,
  chat: /* Destination */,
  reply: /* Reply options */,
  markup: /* Reply markup */,
  options: /* Send options */,
})
```
