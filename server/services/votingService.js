const db = require("./db");

const showCandidates = (post) => {
  return db.Candidate.find({ post }).then((candidates) => {
    if (candidates) {
      return {
        statusCode: 205,
        status: true,
        candidates: candidates,
      };
    } else {
      return {
        statusCode: 405,
        status: false,
        message: "Something went wrong",
      };
    }
  });
};

const voteCandidate = (admsn_no, post, vote_count) => {
  const count = parseInt(vote_count);
  return db.Candidate.findOne({ admsn_no, post }).then((result) => {
    console.log(result);
    if (result) {
      console.log(result.vote_count);
      result.vote_count += count;
      console.log(result.vote_count);
      result.save();
      return {
        statusCode: 206,
        status: true,
        message: "Your vote is registered.Thank You!!!",
        result,
      };
    } else {
      return {
        statusCode: 406,
        status: false,
        message: "Something went wrong",
      };
    }
  });
};

module.exports = { showCandidates, voteCandidate };
