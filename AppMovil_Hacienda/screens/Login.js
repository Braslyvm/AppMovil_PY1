import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert ,TouchableOpacity } from 'react-native';
import { firebase } from '../BD/Autentificacion.jsx'; // Importamos firebase desde el archivo de configuración

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // Si la autenticación es exitosa, redirigir al usuario
          navigation.replace('MainApp'); // Redirige a la pantalla principal (cambia 'MainApp' por el nombre de tu pantalla)
        })
        .catch((error) => {
          // Manejar el error de autenticación
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
  }

  

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
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <TouchableOpacity style={styles.button} onPress={fastlogin}>
        <Text style={styles.buttonText}>Iniciar Rapido</Text>
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
});
