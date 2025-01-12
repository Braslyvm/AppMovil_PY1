import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";

function ConversorMonedas() {
  const [tipoCambio, setTipoCambio] = useState({ dolar: {}, euro: {} });
  const [cargando, setCargando] = useState(true);
  const [monto, setMonto] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [conversion, setConversion] = useState("colon_dolar");

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
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Conversor de Monedas</Text>

      <TextInput
        style={estilos.input}
        keyboardType="numeric"
        placeholder="Ingrese el monto"
        value={monto.toString()}
        onChangeText={(texto) => setMonto(parseFloat(texto) || 0)}
      />

      <Picker
        selectedValue={conversion}
        style={estilos.picker}
        onValueChange={(itemValue) => setConversion(itemValue)}
      >
        <Picker.Item label="De Colón a Dólar" value="colon_dolar" />
        <Picker.Item label="De Dólar a Colón" value="dolar_colon" />
        <Picker.Item label="De Colón a Euro" value="colon_euro" />
        <Picker.Item label="De Euro a Colón" value="euro_colon" />
        <Picker.Item label="De Dólar a Euro" value="dolar_euro" />
        <Picker.Item label="De Euro a Dólar" value="euro_dolar" />
      </Picker>

      <TouchableOpacity style={estilos.boton} onPress={realizarConversion}>
        <Text style={estilos.textoBoton}>Convertir</Text>
      </TouchableOpacity>

      <Text style={estilos.resultado}>Resultado: {resultado.toFixed(2)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },

  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },

  boton: {
    backgroundColor: "#E5D9F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },

  textoBoton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultado: {
    fontSize: 18,
    marginTop: 20,
    color: "#333",
  },
});

export default ConversorMonedas;
