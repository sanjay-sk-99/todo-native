// GradientLayout.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientLayout = ({ children }) => {
  return (
    <LinearGradient
      colors={["rgba(238, 174, 202, 1)", "rgba(148, 187, 233, 1)"]}
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
