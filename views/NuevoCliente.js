import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from "react-native-paper";
import globalStyles from "../styles/global";
import axios from "axios";


const NuevoCliente = ({ navigation, route }) => {

    const { guardarConsultarAPI } = route.params;
    //Campos formulario
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmrpesa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    //detectar si estamos editando o creando nuevo cliente
    useEffect(() => {
        if (route.params.cliente) {
            const { nombre, telefono, empresa, correo } = route.params.cliente;

            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmrpesa(empresa);

        }

    }, [])

    //Almacena en BD
    const guardarCliente = async () => {
        //validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true);
            return;
        }
        //generar el cliente
        const cliente = { nombre, telefono, correo, empresa }
        //estamos editando o creando un cliente
        if (route.params.cliente) {
            const { id } = route.params.cliente;
            cliente.id = id;
            const url = `http://10.0.2.2:3000/clientes/${id}`

            try {
                await axios.put(url, cliente)
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                await axios.post('http://10.0.2.2:3000/clientes', cliente);
            } catch (error) {
                console.log(error);
            }
        }
        //redireccionar
        navigation.navigate('Inicio');
        //limpiar FORM
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmrpesa('');

        //cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true)
    }


    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
            <TextInput
                style={styles.input}
                label='Nombre'
                placeholder="Visdo"
                value={nombre}
                onChangeText={(texto) => guardarNombre(texto)}
            />
            <TextInput
                style={styles.input}
                label='Teléfono'
                placeholder="+99 999 999"
                value={telefono}
                onChangeText={(texto) => guardarTelefono(texto)}
            />
            <TextInput
                style={styles.input}
                label='Correo'
                placeholder="correo@correo.com"
                value={correo}
                onChangeText={(texto) => guardarCorreo(texto)}
            />
            <TextInput
                style={styles.input}
                label='Empresa'
                placeholder="Nombre Empresa"
                value={empresa}
                onChangeText={(texto) => guardarEmrpesa(texto)}
            />
            <Button
                icon='pencil-circle'
                mode='contained'
                onPress={() => guardarCliente()}
            >
                Guardar Cliente
            </Button>
            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => guardarAlerta(false)}
                        >OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;