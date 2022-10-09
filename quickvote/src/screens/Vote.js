import { NavigationContainerRefContext } from "@react-navigation/native";
import {
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import logo from "../../assets/quickvote_main.png";
import poweredby from "../../assets/poweredby.png";
import FontText from "../components/FontText";
import { FontAwesome5 } from "@expo/vector-icons";

export default ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/bg_imgs/homescreen.png")}
      style={styles.bg}
      resizeMode={"cover"}
      opacity={0.3}
    >
      <View style={styles.container} opacity={1}>
        <Image
          source={logo}
          style={{ width: 500, height: 200, marginTop: 25 }}
        />
        <View style={{ display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.vote_btn}
            onPress={() => navigation.navigate("Auth")}
          >
            <FontText style={{ color: "white", fontSize: 30 }} bold={false}>
              VOTE NOW
            </FontText>
          </TouchableOpacity>

          <Image
            source={poweredby}
            style={{ width: 400, height: 100, marginTop: 30 }}
          />
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
