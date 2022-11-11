const db = require("./db");

const searchCandidate = (post) => {
  return db.Candidate.find({ post }).then((result) => {
    if (result) {
      return {
        statusCode: 208,
        status: true,
        result,
      };
    } else {
      return {
        statusCode: 408,
        status: false,
      };
    }
  });
};

const showVoters = () => {
  return db.Voter.find().then((result) => {
    if (result) {
      return {
        statusCode: 208,
        status: true,
        result,
      };
    } else {
      return {
        statusCode: 408,
        status: false,
      };
    }
  });
};

const winner = (post) => {
  // return db.Candidate.findOne({ post }, { $max: { vote_count } }).then(
  return db.Candidate.find({ post })
    .sort({ vote_count: -1 })
    .limit(1)
    .then((result) => {
      if (result) {
        return result;
      }
    });
};

module.exports = { searchCandidate, showVoters, winner };
