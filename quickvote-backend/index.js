const { default: axios } = require("axios");
const express = require("express");
const NodeRSA = require("node-rsa");
const fs = require("fs");

const app = express();
const port = 3500;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let users = {}; // ssn -> user data

app.post("/signup", (req, res) => {
  users[req.body.ssn] = { email: req.body.email, password: req.body.pass };
  console.log(users);
  return res.sendStatus(200);
});

app.post("/login", (req, res) => {
  try {
    if (users[req.body.ssn].password == req.body.pass) {
      return res.sendStatus(200);
    }

    return res.sendStatus(401);
  } catch {
    return res.sendStatus(401);
  }
});

app.get("/elections", (req, res) => {
  return res.send([
    {
      id: 0,
      name: "2022 Presedential Election",
      color: "#134989",
      candidates: [
        {
          id: 0,
          name: "Donald Trump",
          avatar_img: "../assets/bg_imgs/trump.png",
          learnMoreUrl: "",
          description:
            "Trump kfdkhfq kljahdjk fahd hsfkskf sdhak fhkjsadfhjks hksf dahj",
        },
        {
          id: 1,
          name: "Joe Biden",
          avatar_img: "../assets/bg_imgs/biden.png",
          learnMoreUrl: "",
          description:
            "Biden jafljklkads klf jkl jkla fljjlkfskdldflaskkfl sdksfaj",
        },
      ],
      name: "2022 Presedential Election",
    },
  ]);
});

app.post("/vote", async (req, res) => {
  let data = req.body.data;
  // let key = new NodeRSA();

  // key = key.generateKeyPair();

  // let privateKey = key.exportKey("private");
  // let publicKey = key.exportKey("pkcs8-public-pem");

  let privateKey = fs.readFileSync("/home/deds3t/Downloads/kp3").toString();
  let publicKey = fs.readFileSync("/home/deds3t/Downloads/kp3.pub").toString();

  let pubKey = new NodeRSA();
  pubKey.importKey(publicKey, "pkcs8-public-pem");
  let privKey = new NodeRSA();
  privKey.importKey(privateKey, "pkcs1-private-pem");
  let r = privKey.encryptPrivate(data, "base64");

  console.log(r);

  console.log({
    pubkey: publicKey,
    value: r,
  });

  let result = await axios.post("http://localhost:9000/mempool-json", {
    pubkey: publicKey,
    value: r,
  });

  return res.sendStatus(200);
});

app.post("/num-vote", async (req, res) => {
  let r = [];
  for (let cand in req.body.candidates) {
    console.log(`Checking for ${cand}`);
    console.log(`http://localhost:9000/num-votes-json?for=Election:${cand}`);
    let result = await axios.get(
      `http://localhost:9000/num-votes-json?for=Election:${cand}`
    );
    console.log(`Appending ${result.data.num}`);

    r.push(result.data.num);
  }

  return res.send({ result: r });
});

app.listen(port, () => {
  console.log("Started listening");
});
