# Code Review Exercise: REVIEW.md

## Flawed Code Snippet

The following code is a hypothetical implementation of a workflow step executor that contains several anti-patterns and bugs.

```javascript
// executor.js
const executeStep = async (step, data) => {
  if (step.type == 'HTTP') {
    let response = await fetch(step.url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  } else if (step.type == 'DB') {
    const db = require('mysql'); // Dynamic require
    const connection = db.createConnection(process.env.DB_URL);
    connection.query(step.query, (err, result) => {
      if (err) throw err; // Unhandled in async context
      return result; 
    });
  }
}
```

## Reviewer Feedback

### 1. Equality Checks
- **Issue**: Use of loose equality `==`.
- **Recommendation**: Use strict equality `===` to avoid unexpected type coercion.

### 2. Error Handling
- **Issue**: The HTTP fetch does not check `response.ok`. A 500 status code would not throw an error, but `response.json()` might still fail.
- **Issue**: In the 'DB' branch, `throw err` inside a callback will crash the process because it's not caught by the `async` wrapper.
- **Recommendation**: Use `try/catch` and `promisify` the database callback.

### 3. Performance & Architecture
- **Issue**: `require('mysql')` inside the function is an expensive operation that runs every time a step is executed.
- **Issue**: Database connections are created and presumably leaked (no `connection.end()`).
- **Recommendation**: Initialize the database driver and pool at the module level.

### 4. Security
- **Issue**: SQL injection risk in `connection.query(step.query)`.
- **Recommendation**: Use parameterized queries/prepared statements.

### 5. Logic
- **Issue**: The 'DB' branch returns nothing to the caller because the `return result` is inside the callback, while `executeStep` itself finishes without a return value in that branch.
- **Recommendation**: Use a `Promise` or `await` for the DB operation.
