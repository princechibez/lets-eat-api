# Let's eat API

- ## Current features:

  - Automated mail
  - Server uses a cluster method to split itself across the different CPU's in the hosted environment to mimick the microservice method and not the monolithic method
  - All data passed to the server are properly validated to ensure they're in the proper format in order to avoid server's violation and to promote consistency in server delivery

- ## Instructions:

  - Do not PUSH to the main branch for any reason, that's the production branch
  - Make sure you don't have a bug before pushing
  - Push to a feature branch and then merge to the develop
  - If you don't understand this push to the develop or u can communicate to me on whatsapp

  - Response should be sent in the format below

  ```
  res.status(statusCode)
  .json({data: dataHere, success: boolean, error: boolean, message: "blablabla"})
  ```

  - Handle errors in this manner

  ```
  // by calling the next(err) and pass the error as a parameter will automatically trigger the middleware responsible for error handling
  try {
    ...
    // throw error when suspected
  } catch (err) {
      err.statusCode = errorCode; // pass status code here, by default it's 500
      next(err) // this calls the error handler ASAP
    }
  ```

### Run locally

```
Clone repo
npm install
npm run dev // To start developement mode
```

### Hope you enjoyed. Thank you 👋👋
