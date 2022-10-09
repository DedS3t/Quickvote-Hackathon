import { useState } from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import auth from "../backend_interactions/AuthManager";
import { Input } from "@rneui/themed";
import LogoVertical from "../components/LogoVertical";
import FontText from "../components/FontText";

export default ({ navigation }) => {
  if (auth.isAuthed()) navigation.navigate("App");

  let [type, setType] = useState("Signup");

  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [ssn, setSsn] = useState("");
  let [error, setError] = useState("");

  let signup = async () => {
    setError("");

    if (email.length < 4) setError("Invalid email");
    if (pass.length < 6) setError("Password must be at least 6 characters");
    if (ssn.length != 9) setError("Invalid SSN");

    if (error.length > 0) return;

    if (await auth.CreateAccount(ssn, email, pass)) {
      if (await auth.Login(ssn, email, pass)) navigation.navigate("App");
      else setError("Failed Authenticating Login");
    } else {
      setError("Failed Creating Account");
    }
  };

  let login = async () => {
    setError("");

    if (await auth.Login(ssn, email, pass)) navigation.navigate("App");
    else setError("Invalid Credentials");
  };

  return (
    <ImageBackground
      source={require("../../assets/bg_imgs/homescreen.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode={"cover"}
      opacity={0.3}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LogoVertical style={{ marginBottom: 20 }} />

        <Text style={{ fontSize: 30, marginBottom: 50 }}>{type}</Text>

        {error.length > 0 && <Text style={{ color: "red" }}>{error}</Text>}

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label="Email"
          value={email}
          labelStyle={{ color: "black" }}
          onChangeText={(newEmail) => setEmail(newEmail)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          label="Password"
          value={pass}
          labelStyle={{ color: "black" }}
          onChangeText={(newPass) => setPass(newPass)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label="SSN"
          value={ssn}
          labelStyle={{ color: "black" }}
          onChangeText={(newSsn) => setSsn(newSsn)}
        />

        <TouchableOpacity
          onPress={type == "Signup" ? signup : login}
          style={{
            backgroundColor: "rgba(8,14,44,0.8)",
            paddingHorizontal: 100,
            paddingVertical: 12,
            borderRadius: 50,
          }}
        >
          <FontText style={{ color: "white", fontSize: 20 }}>{type}</FontText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setType(type == "Signup" ? "Login" : "Signup")}
        >
          <Text style={{ marginTop: 20, fontSize: 15 }}>
            {type == "Signup"
              ? "Already have an account? Login!"
              : "Don't have an account? Signup!"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
