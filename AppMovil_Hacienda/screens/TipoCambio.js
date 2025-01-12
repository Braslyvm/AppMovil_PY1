import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

function TipoCambio() {
  const [dolar, setDolar] = useState({});
  const [euro, setEuro] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerTipoCambio();
  }, []);

  const obtenerTipoCambio = async () => {
    try {
      // Obtener los valores de compra y venta del dólar
      const respuestaDolar = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
      if (!respuestaDolar.ok) {
        throw new Error("Error al obtener el tipo de cambio del dólar");
      }
      const datosDolar = await respuestaDolar.json();
      setDolar(datosDolar); 
  
      // Obtener los valores del euro
      const respuestaEuro = await fetch("https://api.hacienda.go.cr/indicadores/tc/euro");
      if (!respuestaEuro.ok) {
        throw new Error("Error al obtener el tipo de cambio del euro");
      }
      const datosEuro = await respuestaEuro.json();
      setEuro(datosEuro);
  
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };
  
  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Tipo de Cambio</Text>
      <View style={estilos.tarjeta}>
        <Text style={[estilos.tituloMoneda, estilos.textoNegro]}>Dólar</Text>
        <Text style={[estilos.tasa, estilos.textoNegro]}>
          Compra: {dolar.compra ? dolar.compra.valor : "No disponible"}
        </Text>
        <Text style={[estilos.tasa, estilos.textoNegro]}>
          Venta: {dolar.venta ? dolar.venta.valor : "No disponible"}
        </Text>
        <Text style={[estilos.fecha, estilos.textoNegro]}>
          Fecha: {dolar.compra ? dolar.compra.fecha : "No disponible"}
        </Text>
      </View>
  
      <View style={estilos.tarjeta}>
        <Text style={[estilos.tituloMoneda, estilos.textoNegro]}>Euro</Text>
        <Text style={[estilos.tasa, estilos.textoNegro]}>
          Dólares: {euro.dolares ? euro.dolares : "No disponible"}
        </Text>
        <Text style={[estilos.tasa, estilos.textoNegro]}>
          Colones: {euro.colones ? euro.colones : "No disponible"}
        </Text>
        <Text style={[estilos.fecha, estilos.textoNegro]}>
          Fecha: {euro.fecha ? euro.fecha : "No disponible"}
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 15,
    width: '100%',
  },
  tituloMoneda: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tasa: {
    fontSize: 16,
    marginTop: 5,
  },
  fecha: {
    fontSize: 14,
    marginTop: 5,
    color: '#888',
  },
  textoNegro: {
    color: 'black',
  },
});

export default TipoCambio;
