const express = require("express");
const router = express.Router();
const projectService = require("./ProjectService");

router.get("/", function (req, res) {
  projectService.getAllProjectNames(function (err, projectNames) {
    if (err) {
      res.send("Something went wrong " + err);
    } else {
      res.send(projectNames);
    }
  });
});

router.delete("/:projectName", function (req, res) {
  projectService.deleteProject(
    req.params.projectName,
    function (err, deletedProject) {
      if (err) {
        res.send("Error: " + err);
      } else {
        res.send(deletedProject);
      }
    }
  );
});

module.exports = router;
