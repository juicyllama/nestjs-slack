<p align="center">
  <a href="https://juicyllama.com/" target="_blank">
    <img src="https://juicyllama.com/assets/images/icon.png" width="100" alt="JuicyLlama Logo" />
  </a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
A NestJS app for integrating with Slack
</p>

## Install

```bash
npm i @juicyllama/nestjs-slack
```

## Usage

You can checkout the [Sandbox](./src/sandbox/) for an example implementation.

### Configuration

```bash
SLACK_TOKEN=<YOUR_TOKEN_HERE>
SLACK_DEFAULT_CHANNEL=<YOUR_DEFAULT_CHANNEL>
```

## Types

We are extending the Slack SDK here: 

- https://www.npmjs.com/package/@slack/web-api 
- https://docs.slack.dev/tools/node-slack-sdk/web-api/ 

## Testing

We are using faker with the live service to test.