import axios from "axios";
import Globals from "./Globals";

class AuthManager {
  constructor() {
    this.auth = false;
    this.voted = false;
    this.user = {};
  }

  async Login(ssn, email, pass) {
    console.log(`Login ${email} ${pass} ${ssn}`);
    let result = await axios.post(`${Globals.api}/login`, { ssn, email, pass });
    if (result.status == 200) {
      this.auth = true;
      this.user = { ssn, email, pass };
      return true;
    }

    return false;
  }
  async CreateAccount(ssn, email, pass) {
    console.log(`Create Account ${ssn} ${email} ${pass}`);
    let result = await axios.post(`${Globals.api}/signup`, {
      ssn,
      email,
      pass,
    });
    this.user = { ssn, email, pass };
    return result.status == 200;
  }

  isAuthed() {
    return this.auth;
  }

  hasVoted() {
    return this.voted;
  }
}

const auth = new AuthManager();

export default auth;
