const db = require("./db");

const addVoter = (name, admsn_no, dept, batch, pswd, vote_status) => {
  return db.Voter.findOne({ admsn_no }).then((user) => {
    if (user) {
      return {
        statusCode: 400,
        status: false,
        message: "Voter already exist",
      };
    } else {
      const newUser = new db.Voter({
        name,
        admsn_no,
        dept,
        batch,
        pswd,
        vote_status,
      });
      newUser.save();
      return {
        statusCode: 200,
        status: true,
        message: "Voter added successfully",
      };
    }
  });
};

const adminLogin = (adminId, adminPswd) => {
  return db.Admin.findOne({ adminId }).then((admin) => {
    if (admin) {
      if (adminPswd == admin.adminPswd) {
        return {
          statusCode: 201,
          status: true,
          message: "Admin login successfully",
          admin: admin.adminId,
        };
      } else {
        return {
          statusCode: 401,
          status: false,
          message: "Incorrect Password",
        };
      }
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Admin does not exist",
      };
    }
  });
};

const login = (admsn_no, pswd) => {
  return db.Voter.findOne({ admsn_no }).then((voter) => {
    if (voter) {
      if (pswd == voter.pswd) {
        return {
          statusCode: 202,
          status: true,
          message: "login successfully",
          voter: voter.admsn_no,
        };
      } else {
        return {
          statusCode: 402,
          status: false,
          message: "incorrect password",
        };
      }
    } else {
      return {
        statusCode: 402,
        status: false,
        message: "Your are not familier here...",
      };
    }
  });
};

const addCandidate = (admsn_no, name, post, party, vote_count) => {
  return db.Voter.findOne({ admsn_no }).then((candidate) => {
    if (candidate) {
      if (candidate.name == name) {
        const newCandidate = new db.Candidate({
          admsn_no,
          name,
          post,
          party,
          vote_count,
        });
        newCandidate.save();
        return {
          statusCode: 203,
          status: true,
          message: "Candidate added successfully",
        };
      } else {
        return {
          statusCode: 403,
          status: false,
          message: "Check the name!!!",
        };
      }
    } else {
      return {
        statusCode: 403,
        status: false,
        message: "voter does not exist",
      };
    }
  });
};

module.exports = { addVoter, adminLogin, login, addCandidate };
