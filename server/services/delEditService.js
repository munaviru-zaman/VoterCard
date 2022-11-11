const db = require("./db");

const showCandidate = (admsn_no) => {
  return db.Candidate.findOne({ admsn_no }).then((result) => {
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

const showVoter = (admsn_no) => {
  return db.Voter.findOne({ admsn_no }).then((result) => {
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

const editCandidate = (admsn_no, newpost, newparty) => {
  return db.Candidate.updateOne(
    { admsn_no },
    { $set: { post: newpost, party: newparty } }
  ).then((result) => {
    if (result) {
      return {
        statusCode: 210,
        status: true,
        message: "Candidate successfully edited",
        result,
      };
    } else {
      return {
        statusCode: 410,
        status: false,
        message: "Something went wrong",
      };
    }
  });
};

const editVoter = (admsn_no, newname, newadmsn_no, newdept, newbatch) => {
  return db.Voter.updateOne(
    { admsn_no },
    {
      $set: {
        name: newname,
        admsn_no: newadmsn_no,
        dept: newdept,
        batch: newbatch,
      },
    }
  ).then((result) => {
    if (result) {
      return {
        statusCode: 210,
        status: true,
        message: "Voter successfully edited",
      };
    } else {
      return {
        statusCode: 410,
        status: false,
        message: "Something went wrong",
      };
    }
  });
};

const deleteCandidate = (admsn_no) => {
  return db.Candidate.deleteOne({ admsn_no }).then((result) => {
    if (result) {
      return {
        statusCode: 211,
        status: true,
        message: "Candidate successfully deleted",
        result,
      };
    } else {
      return {
        statusCode: 411,
        status: false,
        message: "Something went wrong",
        result,
      };
    }
  });
};

const deleteVoter = (admsn_no) => {
  return db.Voter.deleteOne({ admsn_no }).then((result) => {
    if (result) {
      return {
        statusCode: 211,
        status: true,
        message: "Voter successfully deleted",
        result,
      };
    } else {
      return {
        statusCode: 411,
        status: false,
        message: "Something went wrong",
        result,
      };
    }
  });
};

module.exports = {
  editCandidate,
  showCandidate,
  showVoter,
  editVoter,
  deleteCandidate,
  deleteVoter,
};
