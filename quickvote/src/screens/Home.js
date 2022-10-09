import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import FontText from "../components/FontText";
import LogoVertical from "../components/LogoVertical";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

export default ({ navigation }) => {
  let [modalVisible, setModalVisible] = useState(true);

  return (
    <ImageBackground
      source={require("../../assets/bg_imgs/home.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode={"cover"}
      opacity={0.7}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontText bold={true} style={{ fontSize: 25, marginBottom: 5 }}>
              Security
            </FontText>
            <FontText style={styles.modalText}>
              A RSA key pair is used to authenticate you. You can choose to
              either save it yourself by pressing "download", or Opt-in to the
              quickvote key managment system that will securely store them for
              you by pressing "Opt-in".
            </FontText>
            <Pressable
              style={[styles.button, styles.buttonClose, { width: 100 }]}
              onPress={() => setModalVisible(false)}
            >
              <FontText bold={true} style={styles.textStyle}>
                Download
              </FontText>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { marginTop: 10, width: 100 },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <FontText bold={true} style={styles.textStyle}>
                Opt-in
              </FontText>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <LogoVertical />

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
            VOTING MADE EASY
          </FontText>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}
        >
          <FontText
            bold={true}
            style={{ color: "black", fontSize: 30, textAlign: "center" }}
          >
            Democracy at the Palm of your Hand
          </FontText>
          <FontText
            bold={false}
            style={{ color: "black", fontSize: 23, textAlign: "center" }}
          >
            Vote with security and confidence
          </FontText>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
              marginTop: 40,
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate("Search")}
          >
            <FontText bold={false} style={{ fontSize: 25 }}>
              Get Started {"  "}
              <FontAwesome5 name="chevron-right" size={25} />
            </FontText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 15,
  },
});
