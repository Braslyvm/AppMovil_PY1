import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useGlobalContext } from './GlobalContext';
import translateText from './translate';

function TipoCambio() {
  const [dolar, setDolar] = useState({});
  const [euro, setEuro] = useState({});
  const [cargando, setCargando] = useState(true);
  const [translatedContent, setTranslatedContent] = useState({
    titulo: 'Tipo de Cambio',
    dolar: 'Dólar',
    compra: 'Compra',
    venta: 'Venta',
    fecha: 'Fecha',
    euro: 'Euro',
    dolares: 'Dólares',
    colones: 'Colones',
    noDisponible: 'No disponible',
  });

  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    obtenerTipoCambio();
    translateContent();
  }, [translate]);

  useEffect(() => {
    translateContent();
  }, [translate]);

  const translateContent = async () => {
    if (translate) {
      const titulo = await translateText('Tipo de Cambio', 'es', 'en');
      const dolar = await translateText('Dólar', 'es', 'en');
      const compra = await translateText('Compra', 'es', 'en');
      const venta = "Sale";
      const fecha = await translateText('Fecha', 'es', 'en');
      const euro = await translateText('Euro', 'es', 'en');
      const dolares = await translateText('Dólares', 'es', 'en');
      const colones = await translateText('Colones', 'es', 'en');
      const noDisponible = await translateText('No disponible', 'es', 'en');

      setTranslatedContent({
        titulo, dolar, compra, venta, fecha, euro, dolares, colones, noDisponible
      });
    } else {
      setTranslatedContent({
        titulo: 'Tipo de Cambio',
        dolar: 'Dólar',
        compra: 'Compra',
        venta: 'Venta',
        fecha: 'Fecha',
        euro: 'Euro',
        dolares: 'Dólares',
        colones: 'Colones',
        noDisponible: 'No disponible',
      });
    }
  };

  const obtenerTipoCambio = async () => {
    try {
      const respuestaDolar = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
      if (!respuestaDolar.ok) {
        throw new Error("Error al obtener el tipo de cambio del dólar");
      }
      const datosDolar = await respuestaDolar.json();
      setDolar(datosDolar);

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
    <View style={[estilos.contenedor, { backgroundColor: dark ? '#333' : '#f5f5f5' }]}>
      <Text style={[estilos.titulo, { color: dark ? '#fff' : '#000' }]}>{translatedContent.titulo}</Text>

      <View style={[estilos.tarjeta, { backgroundColor: dark ? '#555' : '#fff' }]}>
        <Text style={[estilos.tituloMoneda, { color: dark ? '#fff' : '#000' }]}>{translatedContent.dolar}</Text>
        <Text style={[estilos.tasa, { color: dark ? '#fff' : '#000' }]}>
          {translatedContent.compra}: {dolar.compra ? dolar.compra.valor : translatedContent.noDisponible}
        </Text>
        <Text style={[estilos.tasa, { color: dark ? '#fff' : '#000' }]}>
          {translatedContent.venta}: {dolar.venta ? dolar.venta.valor : translatedContent.noDisponible}
        </Text>
        <Text style={[estilos.fecha, { color: dark ? '#ccc' : '#888' }]}>
          {translatedContent.fecha}: {dolar.compra ? dolar.compra.fecha : translatedContent.noDisponible}
        </Text>
      </View>

      <View style={[estilos.tarjeta, { backgroundColor: dark ? '#555' : '#fff' }]}>
        <Text style={[estilos.tituloMoneda, { color: dark ? '#fff' : '#000' }]}>{translatedContent.euro}</Text>
        <Text style={[estilos.tasa, { color: dark ? '#fff' : '#000' }]}>
          {translatedContent.dolares}: {euro.dolares ? euro.dolares : translatedContent.noDisponible}
        </Text>
        <Text style={[estilos.tasa, { color: dark ? '#fff' : '#000' }]}>
          {translatedContent.colones}: {euro.colones ? euro.colones : translatedContent.noDisponible}
        </Text>
        <Text style={[estilos.fecha, { color: dark ? '#ccc' : '#888' }]}>
          {translatedContent.fecha}: {euro.fecha ? euro.fecha : translatedContent.noDisponible}
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
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tarjeta: {
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
});

export default TipoCambio;
