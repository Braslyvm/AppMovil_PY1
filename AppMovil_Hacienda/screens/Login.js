import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../BD/Autentificacion.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import translateText from './translate';
import { useGlobalContext } from './GlobalContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [translatedContent, setTranslatedContent] = useState({
    iniciarSesion: 'Inicio de sesión',
    correoElectronico: 'Correo Electrónico',
    contrasena: 'Contraseña',
    iniciarSesionButton: 'Iniciar sesión',
    noCuenta: '¿No tienes una cuenta? Regístrate',
    errorCorreoContrasena: 'El correo o la contraseña es incorrecta',
    errorIngresar: 'Por favor ingresa tu correo y contraseña'
  });
  const { dark, translate } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate){
        const iniciarSesion = await translateText('Inicio de sesión', 'es', 'en');
        const correoElectronico = await translateText('Correo Electrónico', 'es', 'en');
        const contrasena = await translateText('Contraseña', 'es', 'en');
        const iniciarSesionButton = await translateText('Iniciar sesión', 'es', 'en');
        const noCuenta = await translateText('¿No tienes una cuenta? Regístrate', 'es', 'en');
        const errorCorreoContrasena = await translateText('El correo o la contraseña es incorrecta', 'es', 'en');
        const errorIngresar = await translateText('Por favor ingresa tu correo y contraseña', 'es', 'en');
        setTranslatedContent({
          iniciarSesion,
          correoElectronico,
          contrasena,
          iniciarSesionButton,
          noCuenta,
          errorCorreoContrasena,
          errorIngresar
        });
      }else{
        setTranslatedContent({
          iniciarSesion: 'Inicio de sesión',
          correoElectronico: 'Correo Electrónico',
          contrasena: 'Contraseña',
          iniciarSesionButton: 'Iniciar sesión',
          noCuenta: '¿No tienes una cuenta? Regístrate',
          errorCorreoContrasena: 'El correo o la contraseña es incorrecta',
          errorIngresar: 'Por favor ingresa tu correo y contraseña'
        });
      }
    };

    translateContent();
  }, [translate]);

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
            Alert.alert('Correo o Contraseña incorrecta', 'Porfavor ingrese un correo y una contraseña valido');
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
    <View style={[styles.center, { backgroundColor: dark ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>{translatedContent.iniciarSesion}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.correoElectronico}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.contrasena}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={fastlogin}>
        <Text style={[styles.buttonText, { color: dark ? '#fff' : '#000' }]}>{translatedContent.noCuenta}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.boton, { backgroundColor: dark ? '#444' : '#E5D9F2' }]} onPress={handleLogin}>
        <Text style={[styles.textoBoton, { color: dark ? '#fff' : '#000' }]}>{translatedContent.iniciarSesionButton}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={register}>
        <Text style={[styles.link, { color: dark ? '#1e90ff' : '#1e90ff' }]}>{translatedContent.noCuenta}</Text>
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
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  boton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

