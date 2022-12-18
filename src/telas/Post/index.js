import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { salvarPost, atualizarPost, deletarPost } from "../../servicos/firestore";
import estilos from "./estilos";
import { entradas } from "./entradas";
import { alteraDados } from "../../utils/comum";
import { IconeClicavel } from "../../componentes/IconeClicavel";
import { salvarImagem } from "../../servicos/storage";
import * as ImagePicker from 'expo-image-picker';

const imagemGalaxia = "https://img.freepik.com/fotos-gratis/fundo-de-galaxia-espacial_53876-93121.jpg?w=1380&t=st=1670244963~exp=1670245563~hmac=f67b50518f25bd1278963ec472362c64905851115ae154cc3866fd99a3cea7c1"

import uploadImagemPadrao from '../../assets/upload.jpeg';

export default function Post({ navigation, route }) {
    const [desabilitarEnvio, setDesabilitarEnvio] = useState(false);
    const { item } = route?.params || {};

    const [imagem, setImagem] = useState(null)

    const [post, setPost] = useState({
        titulo: item?.titulo || "",
        fonte: item?.fonte || "",
        descricao: item?.descricao || "",
        imagemUrl: item?.imagemUrl || null
    });

    async function salvar() {
        setDesabilitarEnvio(true);

        if (item) {
            await atualizarPost(item.id, post);
            navigation.goBack();
        } else {
            const idPost = await salvarPost({
                ...post,
                imagemUrl: ''
            });
            navigation.goBack()
            const url = await salvarImagem(imagemGalaxia, 'galaxia');
            await atualizarPost(idPost, {
                imagemUrl: url
            });
        }
    }

    async function escolherImagemDaGaleria(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImagem(result.assets[0].uri);
          }
    }


    return (
        <View style={estilos.container}>
            <View style={estilos.containerTitulo}>
                <Text style={estilos.titulo}>{item ? "Editar post" : "Novo Post"}</Text>
                <IconeClicavel 
                    exibir={!!item} 
                    onPress={() => {deletarPost(item.id); navigation.goBack()}}
                    iconeNome="trash-2" 
                />
            </View>
            <ScrollView style={{ width: "100%" }}>
                {entradas?.map((entrada) => (
                    <View key={entrada.id}>
                        <Text style={estilos.texto}>{entrada.label}</Text>
                        <TextInput
                            value={post[entrada.name]}
                            placeholder={entrada.label}
                            multiline={entrada.multiline}
                            onChangeText={(valor) => 
                                alteraDados(
                                    entrada.name, 
                                    valor, 
                                    post, 
                                    setPost
                                )
                            }
                            style={
                                [estilos.entrada, entrada.multiline && estilos.entradaDescricao]
                            }
                        />
                    </View>
                ))}

                <TouchableOpacity 
                    style={estilos.imagem}
                    onPress={escolherImagemDaGaleria}
                >
                    <Image 
                        source={imagem ? { uri: imagem} : uploadImagemPadrao}
                        style={estilos.imagem}
                    />
                </TouchableOpacity>

            </ScrollView>

            <TouchableOpacity style={estilos.botao} onPress={salvar} disabled={desabilitarEnvio}>
                <Text style={estilos.textoBotao}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}