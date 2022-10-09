import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import FontText from "../../components/FontText";
import LogoVertical from "../../components/LogoVertical";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

export default ({ navigation }) => {
  navigation.setOptions({ title: "2022 Presidential Election Vote" });
  return (
    <ImageBackground
      source={require("../../../assets/bg_imgs/bg1.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode={"cover"}
      opacity={0.3}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <FontText bold={true} style={{ color: "white", fontSize: 30 }}>
              Vote Blockchain Status:{" "}
              <FontAwesome5 name="check" size={24} color="green" />
            </FontText>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(239, 239, 240,.7)",
              display: "flex",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <FontText bold={true} style={{ color: "black", fontSize: 30 }}>
              Vote Transaction Id: F18CYG
            </FontText>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(68, 165, 228, 0.8)",
            display: "flex",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <FontText bold={true} style={{ color: "white", fontSize: 30 }}>
            Vote for: Donald Trump
          </FontText>
        </View>
      </View>
    </ImageBackground>
  );
};
