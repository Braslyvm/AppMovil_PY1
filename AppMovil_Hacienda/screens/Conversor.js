import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useGlobalContext } from './GlobalContext'; // Importa el contexto global
import translateText from './translate'; // Importa la función de traducción

function ConversorMonedas() {
  const [tipoCambio, setTipoCambio] = useState({ dolar: {}, euro: {} });
  const [cargando, setCargando] = useState(true);
  const [monto, setMonto] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [conversion, setConversion] = useState("colon_dolar");
  const [translatedContent, setTranslatedContent] = useState({
    titulo: 'Conversor de Monedas',
    ingresarMonto: 'Ingrese el monto',
    convertir: 'Convertir',
    resultado: 'Resultado',
    deColonADolar: 'De Colón a Dólar',
    deDolarAColon: 'De Dólar a Colón',
    deColonAEuro: 'De Colón a Euro',
    deEuroAColon: 'De Euro a Colón',
    deDolarAEuro: 'De Dólar a Euro',
    deEuroADolar: 'De Euro a Dólar',
  });

  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const titulo = await translateText('Conversor de Monedas', 'es', 'en');
        const ingresarMonto = await translateText('Ingrese el monto', 'es', 'en');
        const convertir = await translateText('Convertir', 'es', 'en');
        const resultado = await translateText('Resultado', 'es', 'en');
        const deColonADolar = await translateText('De Colón a Dólar', 'es', 'en');
        const deDolarAColon = await translateText('De Dólar a Colón', 'es', 'en');
        const deColonAEuro = await translateText('De Colón a Euro', 'es', 'en');
        const deEuroAColon = await translateText('De Euro a Colón', 'es', 'en');
        const deDolarAEuro = await translateText('De Dólar a Euro', 'es', 'en');
        const deEuroADolar = await translateText('De Euro a Dólar', 'es', 'en');

        setTranslatedContent({
          titulo,
          ingresarMonto,
          convertir,
          resultado,
          deColonADolar,
          deDolarAColon,
          deColonAEuro,
          deEuroAColon,
          deDolarAEuro,
          deEuroADolar,
        });
      } else {
        setTranslatedContent({
          titulo: 'Conversor de Monedas',
          ingresarMonto: 'Ingrese el monto',
          convertir: 'Convertir',
          resultado: 'Resultado',
          deColonADolar: 'De Colón a Dólar',
          deDolarAColon: 'De Dólar a Colón',
          deColonAEuro: 'De Colón a Euro',
          deEuroAColon: 'De Euro a Colón',
          deDolarAEuro: 'De Dólar a Euro',
          deEuroADolar: 'De Euro a Dólar',
        });
      }
    };

    translateContent();
  }, [translate]);

  useEffect(() => {
    obtenerTipoCambio();
  }, []);

  const obtenerTipoCambio = async () => {
    try {
      const respuestaDolar = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
      const datosDolar = await respuestaDolar.json();

      const respuestaEuro = await fetch("https://api.hacienda.go.cr/indicadores/tc/euro");
      const datosEuro = await respuestaEuro.json();

      setTipoCambio({ dolar: datosDolar, euro: datosEuro });
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener los tipos de cambio", error);
      setCargando(false);
    }
  };

  const realizarConversion = () => {
    let total = 0;

    switch (conversion) {
      case "colon_dolar":
        total = monto / (tipoCambio.dolar.venta?.valor || 1); // De colón a dólar
        break;
      case "dolar_colon":
        total = monto * (tipoCambio.dolar.compra?.valor || 1); // De dólar a colón
        break;
      case "colon_euro":
        total = monto / (tipoCambio.euro.colones || 1); // De colón a euro
        break;
      case "euro_colon":
        total = monto * (tipoCambio.euro.colones || 1); // De euro a colón
        break;
      case "dolar_euro":
        total = monto * ((tipoCambio.euro.dolares || 0) / (tipoCambio.dolar.venta?.valor || 1)); // De dólar a euro
        break;
      case "euro_dolar":
        total = monto * ((tipoCambio.dolar.venta?.valor || 1) / (tipoCambio.euro.dolares || 1)); // De euro a dólar
        break;
      default:
        total = 0;
    }

    setResultado(total);
  };

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[estilos.contenedor, { backgroundColor: dark ? '#333' : '#F9F9F9' }]}>
      <Text style={[estilos.titulo, { color: dark ? '#fff' : '#333' }]}>{translatedContent.titulo}</Text>

      <TextInput
        style={[estilos.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#333' }]}
        keyboardType="numeric"
        placeholder={translatedContent.ingresarMonto}
        value={monto.toString()}
        onChangeText={(texto) => setMonto(parseFloat(texto) || 0)}
      />

      <Picker
        selectedValue={conversion}
        style={[estilos.picker, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#333' }]}
        onValueChange={(itemValue) => setConversion(itemValue)}
      >
        <Picker.Item label={translatedContent.deColonADolar} value="colon_dolar" />
        <Picker.Item label={translatedContent.deDolarAColon} value="dolar_colon" />
        <Picker.Item label={translatedContent.deColonAEuro} value="colon_euro" />
        <Picker.Item label={translatedContent.deEuroAColon} value="euro_colon" />
        <Picker.Item label={translatedContent.deDolarAEuro} value="dolar_euro" />
        <Picker.Item label={translatedContent.deEuroADolar} value="euro_dolar" />
      </Picker>

      <TouchableOpacity style={[estilos.boton, { backgroundColor: dark ? '#444' : '#E5D9F2' }]} onPress={realizarConversion}>
        <Text style={[estilos.textoBoton, { color: dark ? '#fff' : '#000' }]}>{translatedContent.convertir}</Text>
      </TouchableOpacity>

      <Text style={[estilos.resultado, { color: dark ? '#fff' : '#333' }]}>
        {translatedContent.resultado}: {resultado.toFixed(2)}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2", // Color de fondo más suave
    padding: 20,
  },

  titulo: {
    fontSize: 28, // Aumento el tamaño del título para que sea más visible
    fontWeight: "700", // Cambié a 700 para darle más peso
    marginBottom: 30,
    color: "#333", // Color neutro para el título
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#E0E0E0", // Color gris suave
    borderWidth: 1.5, // Borde más delgado para una apariencia más sutil
    borderRadius: 10, // Bordes redondeados más suaves
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FFF", // Fondo blanco para el campo de texto
    fontSize: 16, // Aumento el tamaño de la fuente para mejorar la legibilidad
  },

  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0", // Color más sutil para el borde del picker
    borderRadius: 10,
    backgroundColor: "#FFF", // Fondo blanco
    marginBottom: 20,
  },

  boton: {
    backgroundColor: "#6C63FF", // Color moderno y vibrante
    paddingVertical: 12, // Ajusté la altura para hacerlo más táctil
    paddingHorizontal: 40,
    borderRadius: 10, // Bordes redondeados para un diseño más suave
    alignItems: "center",
    width: "100%",
    shadowColor: "#000", // Agregado un pequeño sombreado
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Para dispositivos Android
  },

  textoBoton: {
    color: "#FFF", // Color blanco para el texto del botón
    fontSize: 18, // Aumento el tamaño para hacerlo más visible
    fontWeight: "bold",
  },

  resultado: {
    fontSize: 20, // Aumento el tamaño para que sea más fácil de leer
    marginTop: 30,
    color: "#333", // Color neutro para el texto de resultado
    fontWeight: "600", // Hago el texto un poco más pesado para destacarlo
  },

  actividadIndicador: {
    marginTop: 20, // Espaciado para el indicador de carga
    color: "#6C63FF", // Color que combine con el diseño general
  },
});


export default ConversorMonedas;
