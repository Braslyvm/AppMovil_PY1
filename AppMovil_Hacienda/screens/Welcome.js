import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>¡Bienvenido!</Text>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textoBoton}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#E5D9F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  textoBoton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
