import { Text } from "react-native";
import { useFonts } from "expo-font";

export default ({ style, bold, children }) => {
  if (!bold) bold = false;

  const [loaded] = useFonts({
    barlow_bold: require("../../assets/barlow-condensed/BarlowCondensed-Black.ttf"),
    barlow_light: require("../../assets/barlow-condensed/BarlowCondensed-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Text
      style={[style, { fontFamily: bold ? "barlow_bold" : "barlow_light" }]}
    >
      {children}
    </Text>
  );
};
