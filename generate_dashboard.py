import os

# Define the base path
base_path = os.path.join(os.getcwd(), "dashboard")

# Directory structure
structure = {
    "views": [
        "layout.ejs",
        "login.ejs",
        "index.ejs",
        "channels.ejs",
        "roles.ejs",
        "webhooks.ejs",
        "sessions.ejs",
        "feedback.ejs"
    ],
    "routes": [
        "auth.js",
        "index.js",
        "channels.js",
        "roles.js",
        "webhooks.js",
        "feedback.js",
        "sessions.js"
    ],
    "middleware": [
        "checkAuth.js"
    ],
    "public": [
        "styles.css"
    ],
    "root_files": [
        "app.js",
        "config.js"
    ]
}

# Create folders and files
for folder, files in structure.items():
    dir_path = base_path if folder == "root_files" else os.path.join(base_path, folder)
    os.makedirs(dir_path, exist_ok=True)
    for file_name in files:
        file_path = os.path.join(dir_path, file_name)
        with open(file_path, "w") as f:
            f.write("// " + file_name + " placeholder\n")

# Populate core files
core_files = {
    "app.js": """\
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

require('dotenv').config();
const config = require('./config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/channels', require('./routes/channels'));
app.use('/roles', require('./routes/roles'));
app.use('/webhooks', require('./routes/webhooks'));
app.use('/feedback', require('./routes/feedback'));
app.use('/sessions', require('./routes/sessions'));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`Dashboard running on http://localhost:${PORT}`));
""",
    "config.js": """\
module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  BOT_GUILD_ID: process.env.BOT_GUILD_ID,
  SESSION_SECRET: process.env.SESSION_SECRET || 'super_secret_key'
};
""",
    "views/layout.ejs": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title><%= title %> | Admin Dashboard</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header><h1>Bane's Lab Admin</h1></header>
  <main><%- body %></main>
</body>
</html>
""",
    "views/index.ejs": """\
<% layout('layout') -%>
<h2>Dashboard Home</h2>
<ul>
  <li><a href="/channels">Channels</a></li>
  <li><a href="/roles">Roles</a></li>
  <li><a href="/webhooks">Webhooks</a></li>
  <li><a href="/sessions">Sessions</a></li>
  <li><a href="/feedback">Feedback</a></li>
</ul>
""",
    "public/styles.css": "body { font-family: sans-serif; padding: 2rem; } header { margin-bottom: 2rem; }"
}

for rel_path, content in core_files.items():
    path_parts = rel_path.split("/")
    target_file = os.path.join(base_path, *path_parts)
    with open(target_file, "w") as f:
        f.write(content)
