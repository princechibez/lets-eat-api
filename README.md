# POSTIT-SOCIAL-APP-API

- ## This API's Scope:

  - Creating User, postit, comments
  - Updating User, postit, comments
  - Deleting User, postit, comments
  - Get all User, postit, comments
  - Get single User, postit, comments

- ## Links:

  - [Live url](https://postit-api-api-v1.onrender.com/api/v1)
  - [Entity Relationship Diagram or Data Modeling Link](https://dbdesigner.page.link/9k3iLLkbBhJSfBvZ9)
  - [API documentation](https://documenter.getpostman.com/view/21580500/2s93JtPhya)

- ## API features:

  - Model indexing for improved search
  - Postits and comments search with either username or userId options as params
  - Ensures users do not cross-interfere with other user's resources
  - Soft deleting. Meaning resources aren't actually deleted but would
    be treated as deleted on further queries

- ## Validations:

  - Ensures that all data from client to server are well checked and formatted

- ## Authentication:
  - There's a strict auth rule required when
    accessing sensitive routes for updating, deleting and creating

### Run locally

```
Clone repo
npm install
npm run dev // To start developement mode
```

### Hope you enjoyed. Thank you 👋👋
