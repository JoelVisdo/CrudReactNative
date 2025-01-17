import React from "react";
import { Button } from "react-native-paper";

const BarraSuperior = ({navigation, route}) => {

    const handlePress = () =>{
        navigation.navigate('NuevoCliente')
    }

    return ( 
        <Button 
        icon='plus-circle'
        textColor="#FFF" //en el video pone 'color' pero esta deprecado <----------
        onPress={ () => handlePress()}>
            Nuevo Cliente
        </Button>
     );
}
 
export default BarraSuperior;