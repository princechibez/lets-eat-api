require('dotenv/config');

const DATABASE = {
    MONGO_URI: process.env.MONGO_URI
}

const SCHEMAS = {
    USER_SCHEMA: "user",
    POST_SCHEMA: "postit",
    COMMENT_SCHEMA: "comment",
}

exports = { DATABASE, SCHEMAS }