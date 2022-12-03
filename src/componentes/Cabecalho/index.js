import { View, Image } from "react-native";
import { IconeClicavel } from "../IconeClicavel";
import estilos from "./estilos";

export function Cabecalho({ acao }) {
    return (
        <View style={estilos.container}>
            <IconeClicavel
                iconeNome="bell"
                iconeTamanho={30}
                iconeCor="#fff"
            />
            <Image source={require("../../assets/logo.png")} />
        </View>
    );
}