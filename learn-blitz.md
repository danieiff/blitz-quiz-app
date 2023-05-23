## ENV

blitz dev --env staging,production // APP_ENV=staging,production; blitz build

# Loaded .env.staging

# Loaded .env.staging.local

# Loaded .env.production

# Loaded .env.production.local

# Loaded .env

# Loaded .env.local

## Error

- AuthenticationError 401
- CSRFTokenMismatchError 401
- AuthorizationError 403
- NotFoundError 404
- RedirectError
  You can throw this error from a render function if you want to redirect the user while also preventing the user from seeing on the current render path. Our ErrorBoundary component will automatically handle this redirect for you.

N

```typescript
import { AuthenticationError } from "blitz"
// https://github.com/blitz-js/blitz/blob/main/packages/blitz/src/errors.ts

try {
  throw new AuthenticationError()
} catch (error) {
  if (error.name === "AuthenticationError") {
    // Handle this error appropriately, like show a login screen
    console.log(error.statusCode)
    console.log(error.message)
  }
}
```

### ErrorBoundary

```typescript
const { reset } = useQueryErrorResetBoundary()

return (
  <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
    <Component {...pageProps} />
  </ErrorBoundary>
```

### Custom Error

```typescript
import SuperJson from "superjson"

export class UsernameTakenError extends Error {
  name = "UsernameTakenError"
  constructor({ suggestedUserName }) {
    super()
    this.suggestedUserName = suggestedUserName
  }
}
// Register with SuperJson serializer so it's reconstructed on the client for qinstanceof` to work.
SuperJson.registerClass(UsernameTakenError)
SuperJson.allowErrorProps("suggestedUserName")

throw new UsernameTakenError({ suggestedUserName: "second_best" })
```

handle error
`FallbackComponent` or

```typescript
<Form
  onSubmit={async (values) => {
    try {
      await setUsername(values.username)
    } catch (error) {
      if (error instanceof UsernameTakenError) {
        setSuggestedUsername(error.suggestedUserName)
      }
    }
  }}
/>
```

## Test

Server: _.test._ files in api, queries, or mutations folder, _.server.test._ files
Client: all others (jsdom works)

## Logging

Default tslog https://tslog.js.org/ in app/blitz-server.ts

## Utils

```typescript
import {validateZodSchema} from 'blitz'

<FinalForm
  initialValues={initialValues}
  validate={validateZodSchema(schema/*, "sync" | "async" */)}
  ...
```

```typescript
import {formatZodError} from 'blitz'

<FinalForm
  initialValues={initialValues}
  validate={values => {
    try {
      schema.parse(values)
    } catch (error) {
      return formatZodError(error)
    }
  }}
  ...
```

## Client and Server

Queries and mutations only run on the server — at build time, the direct function import is replaced with an RPC network call. So the query function code is never included in your client code. It's instead moved to an API layer.

## Debug

https://nodejs.org/en/docs/guides/debugging-getting-started/

- vim, dap
  TODO

- https://code.visualstudio.com/docs/editor/debugging
  https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_breakpoints

```json .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Blitz: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev" // blitz dev
    },
    {
      "name": "Blitz: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000" // port app running
    },
    {
      "name": "Blitz: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

Start debug from panel

- https://developers.google.com/web/tools/chrome-devtools
  https://developers.google.com/web/tools/chrome-devtools/javascript

For client side log, set `localStorage.debug = 'blitz:*'`(or any namespace used by Blitz) on local storage, then refresh page.

---

## Recipes

https://github.com/blitz-js/blitz/tree/canary/recipes
