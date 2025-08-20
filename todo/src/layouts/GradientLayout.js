// GradientLayout.js
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useTheme } from "@react-navigation/native";

const GradientLayout = ({ children }) => {
    const { gradient } = useTheme();
  return (
    <LinearGradient
      colors={gradient.background}
      start={{ x: 0.5, y: 0.5 }} // center
      end={{ x: 1, y: 1 }}       // radiate out
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default GradientLayout;
