import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ListItem, Avatar, LinearProgress } from "@rneui/themed";
import { useEffect, useState } from "react";
import DataManager from "../../backend_interactions/DataManager";
import FontText from "../../components/FontText";
import auth from "../../backend_interactions/AuthManager";

export default ({ navigation, route }) => {
  const { id } = route.params;
  const width = Dimensions.get("window").width;

  let dataIns = new DataManager();
  let data = dataIns.getElection(id);

  navigation.setOptions({ title: data.name });

  let [check, setChecked] = useState(-1);
  let [loading, setLoading] = useState(false);
  let [loadingVote, setVoteLoading] = useState(true);

  let [votes, setVotes] = useState([]);

  useEffect(() => {
    (async () => {
      setVotes(
        await dataIns.getVotes(
          null,
          data.candidates.reduce((acc, val) => acc.concat(val.id), [])
        )
      );

      setVoteLoading(false);
    })();
  }, []);

  let submitVote = async () => {
    if (loading) return;

    setLoading(true);
    if (check == -1) return;

    let res = await dataIns.sendVote(`Election:${check}`);

    if (res) {
      console.log("Vote Succesful");
      navigation.navigate("Search", { screen: "ActualSearch" });
    } else console.log("Failed Vote");

    setLoading(false);
  };

  let getPercent = (id) => {
    for (let i = 0; i < data.candidates.length; i++) {
      if (data.candidates[i].id == id) {
        return votes[i] / (votes.reduce((acc, val) => acc + val, 0) || 1);
      }
    }

    return 0;
  };

  let getNumVotes = (id) => {
    for (let i = 0; i < data.candidates.length; i++) {
      if (data.candidates[i].id == id) {
        return votes[i];
      }
    }

    return 0;
  };

  if (loading || loadingVote) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log(auth.hasVoted());

  if (auth.hasVoted()) {
    return (
      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data.candidates}
          contentContainerStyle={{ alignItems: "center" }}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <ListItem containerStyle={{ width: width, marginVertical: 15 }}>
              <Avatar size={64} source={item.avatar_img} />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  <FontText bold={true}>{item.name}</FontText>
                </ListItem.Title>

                <LinearProgress
                  value={getPercent(item.id)}
                  variant="determinate"
                />

                <ListItem.Subtitle>
                  <FontText bold={false}>
                    Votes: {getNumVotes(item.id)} {"\n"}
                  </FontText>

                  <FontText bold={true}>
                    {(getPercent(item.id) * 100).toFixed(2)}%
                  </FontText>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />

        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#071f4a",
            paddingHorizontal: 100,
            paddingVertical: 12,
            marginTop: 20,
          }}
          onPress={submitVote}
        >
          <FontText style={{ color: "white", fontSize: 20 }}>
            7 Days Left!
          </FontText>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={data.candidates}
        contentContainerStyle={{ alignItems: "center" }}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <ListItem containerStyle={{ width: width, marginVertical: 15 }}>
            <Avatar size={64} source={item.avatar_img} />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                <FontText bold={true}>{item.name}</FontText>
              </ListItem.Title>

              <ListItem.Subtitle>
                <FontText bold={false}>{item.description}</FontText>
              </ListItem.Subtitle>

              <ListItem.Subtitle style={{ marginTop: 10, alignSelf: "center" }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: "#071f4a",
                  }}
                >
                  <FontText bold={false} style={{ color: "white" }}>
                    Learn More
                  </FontText>
                </TouchableOpacity>
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.CheckBox
              checked={check == item.id}
              onPress={() =>
                check == item.id ? setChecked(-1) : setChecked(item.id)
              }
            />
          </ListItem>
        )}
      />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          backgroundColor: "#071f4a",
          paddingHorizontal: 100,
          paddingVertical: 12,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={submitVote}
      >
        <FontText style={{ color: "white", fontSize: 20 }}>
          Submit Vote!
        </FontText>
      </TouchableOpacity>
    </View>
  );
};
