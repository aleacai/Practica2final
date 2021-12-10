import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import Constants from 'expo-constants';

const Home = ({ navigation }) => {
    const [Tempactual, setTempactual] = useState([""]);
    const [Tempmax, setTempmax] = useState([""]);
    const [Tempmin, setTempmin] = useState([""]);
    const [Ciudad, setCiudad] = useState([""]);
    const [consultado, setConsultado] = useState(false);
    const [Lati, setLati] = useState("");
    const [Longi, setLongi] = useState("");

    const buscar = (ciudad) => {
        const apikey = "65c74cf9ff4cbe5bf41e2a609aa3b767";
        const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric`;

        fetch(api_url)
            .then(data => {
                return data.json();
            })
            .then(resultado => {
                setTempactual(resultado.main.temp);
                setTempmax(resultado.main.temp_max);
                setTempmin(resultado.main.temp_min);
                setConsultado(true);
                setLati(resultado.coord.lat);
                setLongi(resultado.coord.lon);

            });
    };



    return (
        <View style={styles.container}>
            <Text h1 style={{textAlign: 'center'}}>Clima</Text>
            <SearchBar
                round
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputStyle={{ backgroundColor: 'white' }}
                onChangeText={(texto) => {
                    setCiudad(texto);
                    buscar(texto);
                }}
                onClear={() => {
                    setCiudad("");
                    setConsultado(false);
                }}
                value={Ciudad}
                placeholder="Ingresa una ciudad"
            />

            <View style={{ flex:1, margin: 10, fontSize: 20, alignItems: 'center' }}>
                {
                    consultado
                        ?
                        <View style={{justifyContent: 'space-around', flex:1}}> 
                            <Text h2 style={styles.texto}>{Ciudad}</Text>
                            <Text h4 style={styles.texto}>Temperatura actual: {Tempactual}°C</Text>
                            <Text h4 style={styles.texto}>Temperatura actual: {Tempmax}°C</Text>
                            <Text h4 style={styles.texto}>Temperatura actual: {Tempmin}°C</Text>
                            
                            <Button
                                title="Pronostico semanal"
                                onPress={() => navigation.navigate('Detalles', { Lati, Longi })}
                            />
                        </View>
                        :
                        <Text style={styles.texto}>
                            Busca una ciudad
                        </Text>
                }

            </View>
        </View>);
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 40
    },
    texto: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    }
});
