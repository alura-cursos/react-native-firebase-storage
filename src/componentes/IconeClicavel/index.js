import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export function IconeClicavel({
  exibir=true,
  onPress,
  iconeNome="trash-2",
  iconeTamanho=25,
  iconeCor="#fff",
}){

  if(!exibir) return null;

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconeNome} size={iconeTamanho} color={iconeCor} />
    </TouchableOpacity>
  );
}