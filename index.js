/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

// bringing in 'express'
const express = require('express');
const server = express();
const port = 4000;
// import our routers here
const actionsRouter = require('./routers/actionsRouter');
const projectsRouter = require('./routers/projectsRouter');
// using pre-built middleware
server.use(express.json());
// using our custom logger
server.use(logger);
// use the custom routers here
server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);
// using helmet for security (not sure if required for this project or it's just something we should always be doing?)
const helmet = require('helmet');
server.use(helmet);

// writing our logger method
function logger(req, res, next) {
  console.log(`${req.method} ${req.originalURL} ${new Date()}`);
  next();
}

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

module.exports = server;
