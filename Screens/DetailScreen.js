import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements'



const DetailScreen = ({ route }) => {
    const { Lati, Longi } = route.params;
    const [datos, setDatos] = useState([]);
    const [wait, setWait] = useState(false);
    useEffect(() => {
        const apikey = "65c74cf9ff4cbe5bf41e2a609aa3b767";
        const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Lati}&lon=${Longi}&exclude=current,minutely,hourly&appid=${apikey}&units=metric`;
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado => {
                console.log(resultado)
                setDatos(resultado);
                setWait(true);
            });

    }, [])

    const createDate = (dt, ix) => {
        if (ix === 0) {
            return "Hoy";
        }
        else {
            var day = new Date(dt * 1000);
            return  day.getDate()+ '-' + (day.getMonth() + 1) + '-' + day.getFullYear();
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    wait
                        ?
                        datos.daily.map((a, b) =>
                            <Card key={b} containerStyle={{
                                borderRadius: 30,
                                backgroundColor:'#fffbbb',
                                minWidth: 300
                            }}>
                                <Card.Title style={{}} >{createDate(a.dt, b)}</Card.Title>
                                <Card.Divider></Card.Divider>
                                <View>
                                    <Text style={{color:'black', textAlign:'center'}}>
                                        Temperatura: {a.temp.day}°C{"\n"}
                                        Temperatura maxima: {a.temp.max}°C{"\n"}
                                        Temperatura minima: {a.temp.min}°C{"\n"}
                                    </Text>
                                </View>
                            </Card>
                        )
                        :
                        <Text style={styles.texto2}>Wait...</Text>

                }
            </ScrollView>
        </View>
    );
}

export default DetailScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

});