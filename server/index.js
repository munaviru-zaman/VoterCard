const express = require("express");
const app = express();
const cors = require("cors");
const registerService = require("./services/registerService");
const votingService = require("./services/votingService");
const searchService = require("./services/searchService");
const delEditService = require("./services/delEditService");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.post("/addvoter", (req, res) => {
  registerService
    .addVoter(
      req.body.name,
      req.body.admsn_no,
      req.body.dept,
      req.body.batch,
      req.body.pswd,
      req.body.vote_status
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

app.post("/adminlogin", (req, res) => {
  registerService
    .adminLogin(req.body.adminId, req.body.adminPswd)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

app.post("/login", (req, res) => {
  registerService.login(req.body.admsn_no, req.body.pswd).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

app.post("/addcandidate", (req, res) => {
  registerService
    .addCandidate(
      req.body.admsn_no,
      req.body.name,
      req.body.post,
      req.body.party,
      req.body.vote_count
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

app.get("/candidates/:post", (req, res) => {
  votingService.showCandidates(req.params.post).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.post("/vote", (req, res) => {
  votingService
    .voteCandidate(req.body.admsn_no, req.body.post, req.body.vote_count)
    .then((result) => {
      if (result) {
        res.status(result.statusCode).json(result);
      }
    });
});

app.get("/candidatelist/:post", (req, res) => {
  searchService.searchCandidate(req.params.post).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.get("/voterlist", (req, res) => {
  searchService.showVoters().then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.get("/showcandidate/:admsn_no", (req, res) => {
  delEditService.showCandidate(req.params.admsn_no).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.patch("/updatecandidate/:admsn_no", (req, res) => {
  delEditService
    .editCandidate(req.params.admsn_no, req.body.newpost, req.body.newparty)
    .then((result) => {
      if (result) {
        res.status(result.statusCode).json(result);
      }
    });
});

app.get("/showVoter/:admsn_no", (req, res) => {
  delEditService.showVoter(req.params.admsn_no).then((result) => {
    res.json(result);
  });
});

app.patch("/updatevoter/:admsn_no", (req, res) => {
  delEditService
    .editVoter(
      req.params.admsn_no,
      req.body.newname,
      req.body.newadmsn_no,
      req.body.newdept,
      req.body.newbatch
    )
    .then((result) => {
      if (result) {
        res.status(result.statusCode).json(result);
      }
    });
});

app.delete("/deletecandidate/:admsn_no", (req, res) => {
  delEditService.deleteCandidate(req.params.admsn_no).then((result) => {
    if (result) {
      res.status(result.statusCode).json(result);
    }
  });
});
app.delete("/deletevoter/:admsn_no", (req, res) => {
  delEditService.deleteVoter(req.params.admsn_no).then((result) => {
    if (result) {
      res.status(result.statusCode).json(result);
    }
  });
});

app.get("/winner/:post", (req, res) => {
  searchService.winner(req.params.post).then((result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Running on port : 3000 :::");
});
