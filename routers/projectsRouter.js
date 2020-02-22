// bringing in express
const express = require('express');
// bringing in helper functions
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();
// first get to grab all data (only one)
router.get('/', (req, res) => {
  Projects.get()
    .then(resources => {
      console.log(resources);
      res.status(201).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resources' });
    });
});
// only one to get but it works!
router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(resource => {
      console.log(resource);
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resource' });
    });
});
// retrive our actions
router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(action => {
      console.log(action);
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve the actions' });
    });
});
// adding an action
router.post('/:id/actions', validateProjectId, (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      console.log(action);
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve the created action' });
    });
});
// second post
router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(resource => {
      console.log(resource);
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resource' });
    });
});
// update project data
router.put('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' });
    });
});

// custom middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      console.log('project', project);
      if (Object.keys(project).length == 0) {
        res.status(400).json({ message: 'invalid project id' });
      } else next();
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: `Couldn't retrieve a project with id: ${id}` });
    });
}

module.exports = router;
