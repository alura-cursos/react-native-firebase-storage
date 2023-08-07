import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity ,Image} from "react-native";
import { salvarPost, atualizarPost, deletarPost } from "../../servicos/firestore";
import estilos from "./estilos";
import { entradas } from "./entradas";
import { alteraDados } from "../../utils/comum";
import { IconeClicavel } from "../../componentes/IconeClicavel";

import { salvarImagem } from "../../servicos/storage";

const imagemGalaxia = "https://img.freepik.com/vetores-gratis/fundo-de-galaxia-em-aquarela-pintado-a-mao_52683-63441.jpg?w=740&t=st=1691416309~exp=1691416909~hmac=7c196aa454bf52ce27c656ae519f94c341230b3411c97d64ba9692af6fd5fc9d"

export default function Post({ navigation, route }) {
    const [desabilitarEnvio, setDesabilitarEnvio] = useState(false);
    const { item } = route?.params || {};

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
           const idpost = await salvarPost({post});
           navigation.goBack();
           const url = await salvarImagem(imagemGalaxia, 'galaxia');
            await atualizarPost(idpost, post),{
                imagemUrl: url
            }
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
            </ScrollView>

            <TouchableOpacity style={estilos.botao} onPress={salvar} disabled={desabilitarEnvio}>
                <Text style={estilos.textoBotao}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}