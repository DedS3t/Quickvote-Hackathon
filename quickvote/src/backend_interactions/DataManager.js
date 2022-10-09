import axios from "axios";
import Globals from "./Globals";
import auth from "./AuthManager";

export default class DataManager {
  getElections() {
    return [{ id: 0, name: "2022 Presidential Election", color: "#134989" }];
  }

  getElection(id) {
    return {
      candidates: [
        {
          id: 0,
          name: "Donald Trump",
          avatar_img: require("../../assets/bg_imgs/trump.png"),
          learnMoreUrl: "",
          description:
            "Trump kfdkhfq kljahdjk fahd hsfkskf sdhak fhkjsadfhjks hksf dahj",
        },
        {
          id: 1,
          name: "Joe Biden",
          avatar_img: require("../../assets/bg_imgs/biden.png"),
          learnMoreUrl: "",
          description:
            "Biden jafljklkads klf jkl jkla fljjlkfskdldflaskkfl sdksfaj",
        },
      ],
      name: "2022 Presidential Election",
    };
  }

  async getVotes(id, candidates) {
    let res = await axios.post(`${Globals.api}/num-vote`, { candidates });

    console.log("==========================");
    console.log(candidates);
    console.log(res.data.result);
    console.log("==========================");

    return res.data;
  }

  getUserVotes() {
    return [
      {
        id: 0,
        name: "2022 Presidential Election",
        verified: true,
      },
    ];
  }

  async sendVote(data) {
    let res = await axios.post(`${Globals.api}/vote`, { data });

    if (res.status == 200) auth.voted = true;
    this.vote = res;
    return res.status == 200;
  }
}
