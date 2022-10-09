import FontText from "../components/FontText";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./profile/Profile";
import VoteList from "./profile/VoteList";
import IndividualVote from "./profile/Vote";

export default ({ navigator }) => {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ActualProfile" component={Profile} />
      <Stack.Screen name="VoteList" component={VoteList} />
      <Stack.Screen name="IndividualVote" component={IndividualVote} />
    </Stack.Navigator>
  );
};
