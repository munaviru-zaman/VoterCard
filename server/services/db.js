const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/VOTERCARD ", {
  useNewUrlParser: true,
});

const Voter = mongoose.model("Voter", {
  name: String,
  admsn_no: String,
  dept: String,
  batch: String,
  pswd: String,
  vote_status: Boolean,
});

const Admin = mongoose.model("Admin", {
  adminId: String,
  adminPswd: String,
});

const Candidate = mongoose.model("Candidate", {
  admsn_no: String,
  name: String,
  post: String,
  party: String,
  vote_count: Number,
});

module.exports = { Voter, Admin, Candidate };
