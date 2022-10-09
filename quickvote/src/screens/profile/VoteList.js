import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale";
import data from "../../backend_interactions/DataManager";
import FontText from "../../components/FontText";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default ({ navigation }) => {
  navigation.setOptions({ title: "Your Votes" });

  let dataIns = new data();
  let [loading, setLoading] = useState(true);
  let votes = dataIns.getUserVotes();
  const width = Dimensions.get("window").width;

  return (
    <ImageBackground
      source={require("../../../assets/bg_imgs/bg1.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode={"cover"}
      opacity={0.3}
      onLoad={() => setLoading(false)}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={votes}
          contentContainerStyle={{ alignItems: "center" }}
          style={{ marginTop: 75 }}
          renderItem={({ item }) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() =>
                navigation.navigate("IndividualVote", { id: item.id })
              }
              containerStyle={{
                borderRadius: 100,
                backgroundColor: "#134989",
              }}
              style={{
                marginVertical: 25,
                width: width * 0.8,
              }}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 23,
                    alignSelf: "center",
                  }}
                >
                  <FontText bold={false}>{item.name}</FontText>{" "}
                  <FontAwesome5 name="check" size={24} color="green" />
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
          )}
        />
      )}
    </ImageBackground>
  );
};
