# Description

Common library for all backend

# How to use

## Install package

```bash
npm install https://github.com/bonjourjoel-bootstrap-nest-next/common-backend
```

## Setup shared modules

### Multipart-json middleware

This allows to apis to consumes bodies in both formats, so the swagger UI can also use form inputs.

Install it in each App module like this:

```typescript
@Module({
  imports: [MultipartJsonMiddlewareModule],
})
```

### Sanitize middleware

This middleware sanitizes the request body and query parameters using `sanitize-html` to prevent XSS attacks.

Install it in the each module like this:

```typescript
@Module({
  imports: [SanitizeMiddlewareModule],
})
```

## General import syntax for other files

```typescript
import { Something } from 'common-backend';
```

# Commands

```bash
npm run test
```

```bash
npm run build
```
