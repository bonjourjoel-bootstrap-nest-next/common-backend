# Description

Common library for backend nest.js REST microservices. It includes:

- a variety of shared types and utilities in /lib/
- a Nest.js CommonModule to import in AppModule and a commonBoostrap() function, which handle:
  - securing the HTTP headers with helmet
  - sanitizing strings sent from the client
  - setting a default throttle rate limit
  - converting multipart bodies to json
  - logging events into console / files / DataDog
  - setting up swagger
  - providing an endpoint /apidoc able to generate OpenApi specification files
  - providing an endpoint /health
  - hashing of passwords and jwt tokens

# How to use

## Install package

```bash
npm install https://github.com/bonjourjoel-bootstrap-nest-next/common-backend
```

## Setup common module

### Prerequisites:

The environment variable NODE_ENV must be defined.

### In app.module.ts

```typescript
@Module({
  imports: [CommonModule],
})
```

### In main.ts

```typescript
  const app = await NestFactory.create(AppModule);
  await commonBootstrap({app, [...]});
```

## General import syntax for other files

```typescript
import { Something } from 'common-backend';
```

# npm commands

```bash
npm run lint
```

```bash
npm run test
```

```bash
npm run build
```
