'use strict';
require('dotenv').config();

// const Git = require("nodegit");
const nodegit = require("nodegit");

const joinPath = require('path').join;
const projectRoot = joinPath(__dirname,'../')
var repository;

console.log(projectRoot)

// Open a repository that needs to be fetched and fast-forwarded
nodegit.Repository.open(projectRoot)
  .then(function(repo) {
    repository = repo;

    return repository.fetchAll({
      callbacks: {
        credentials: function(url, userName) {
          return nodegit.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck: function() {
          return 1;
        }
      }
    });
  })
  // Now that we're finished fetching, go ahead and merge our local branch
  // with the new one
  .then(function() {
    return repository.mergeBranches("master", "origin/master");
  })
  .done(function() {
    console.log("Done!");
  });