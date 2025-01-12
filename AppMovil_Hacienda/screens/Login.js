import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../BD/Autentificacion.jsx'; // Importa auth correctamente
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa el método de inicio de sesión

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.replace('MainApp');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            Alert.alert('Correo inválido', 'Por favor ingresa un correo válido.');
          } else if (errorCode === 'auth/wrong-password') {
            Alert.alert('Contraseña incorrecta', 'La contraseña ingresada es incorrecta.');
          } else {
            Alert.alert('Error', errorMessage);
          }
        });
    } else {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
    }
  };

  const fastlogin = () => {
    navigation.replace('MainApp');
  };

  const register = () => {
    navigation.replace('Register');
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={fastlogin}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={register}>
        <Text style={styles.link}>Registrarse</Text>
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
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#E5D9F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },

  textoBoton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
