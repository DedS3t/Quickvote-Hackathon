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

export default ({ navigation }) => {
  let dataIns = new data();
  let [loading, setLoading] = useState(true);
  let elections = dataIns.getElections();
  const width = Dimensions.get("window").width;

  return (
    <ImageBackground
      source={require("../../../assets/bg_imgs/search.png")}
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
          data={elections}
          contentContainerStyle={{ alignItems: "center" }}
          style={{ marginTop: 75 }}
          renderItem={({ item }) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() => navigation.navigate("Election", { id: item.id })}
              containerStyle={{
                borderRadius: 100,
                backgroundColor: item.color,
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
                    fontSize: 25,
                    alignSelf: "center",
                  }}
                >
                  <FontText bold={false}>{item.name}</FontText>
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
