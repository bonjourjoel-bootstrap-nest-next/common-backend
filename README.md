# Description

Common library for all backend

# How to use

## Install package

```bash
npm install https://github.com/bonjourjoel-bootstrap-nest-next/common-backend
```

## Setup common module

### When application is launched

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
import { Something } from 'common-backend/lib';
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
