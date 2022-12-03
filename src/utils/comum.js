// funcao para adicionar um novo item na lista
export const alteraDados = (variavel, valor, dados, setDados) => {
  setDados({
    ...dados,
    [variavel]: valor
  })
}

// funcao para verificar se a entrada esta vazia
export function verificaSeTemEntradaVazia(dados, setDados) {
  for (const [variavel, valor] of Object.entries(dados)) {
    if (valor == '') {
      setDados({
        ...dados,
        [variavel]: null
      })
      return true
    }
  }
  return false
}