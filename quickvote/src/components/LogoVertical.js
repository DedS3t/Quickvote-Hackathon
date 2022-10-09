import FontText from "./FontText";
import Icon from "../../assets/icon.png";
import { View, Image } from "react-native";

export default ({ style }) => {
  return (
    <View style={[style, { display: "flex", alignItems: "center" }]}>
      <Image source={Icon} style={{ width: 75, height: 75 }} />
      <FontText bold={true} style={{ fontSize: 30 }}>
        QUICKVOTE
      </FontText>
    </View>
  );
};
