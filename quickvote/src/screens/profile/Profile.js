import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import FontText from "../../components/FontText";
import auth from "../../backend_interactions/AuthManager";

export default ({ navigation }) => {
  navigation.setOptions({ title: auth.user.email });
  return (
    <ImageBackground
      source={require("../../../assets/bg_imgs/bg1.png")}
      style={styles.bg}
      resizeMode={"cover"}
      opacity={0.3}
    >
      <View style={styles.container} opacity={1}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.vote_btn}
            onPress={() => navigation.navigate("VoteList")}
          >
            <FontText style={{ color: "white", fontSize: 30 }} bold={false}>
              Check your votes
            </FontText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bg: {
    width: "100%",
    height: "100%",
  },
  vote_btn: {
    backgroundColor: "rgba(8,14,44,0.8)",
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 50,
  },
});
