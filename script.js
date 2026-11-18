let edicao = false
let indiceEdicao = -1

const ativos = JSON.parse(localStorage.getItem('ativos')) || []
const desativos = JSON.parse(localStorage.getItem('desativos')) || []

const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const data = document.getElementById('data')
const salario = document.getElementById('salario')
const funcao = document.getElementById('funcao')
const listaAtivo = document.getElementById('listaAtivo')
const listaDesativo = document.getElementById('listaDesativo')
const botaoCadastro = document.getElementById('botaoCadastrar')

function cadastrar() {
  if (edicao) {
    if (!nome.value || !cpf.value || !data.value || !salario.value || !funcao.value) {
      alert('Preencha todos os campos corretamente')
      return
    }

    if (!/^[a-zA-Z-À-ý\s]+$/.test(nome.value)) {
      alert('O nome só deve conter letras')

      return
    }

    if (cpf.value !== ativos[indiceEdicao].cpf) {
      const cpfRep = ativos.some((e) => {
        return e.cpf == cpf.value
      })

      if (cpfRep) {
        alert('Este cpf já está cadastrado')

        return
      }
    }

    if (!/^\d{11}$/.test(cpf.value)) {
      alert('O cpf precisa ter 11 números')

      return
    }

    if (salario.value <= 0) {
      alert('O salário precisa ser maior que 0')

      return
    }

    if (!/^[a-zA-Z-À-ý\s]+$/.test(funcao.value)) {
      alert('O nome só deve conter letras')

      return
    }

    if (Number(salario.value) <= Number(ativos[indiceEdicao].salario)) {
      alert('O novo salário precisa ser maior que o antigo')

      return
    }

    ativos[indiceEdicao].nome = nome.value
    ativos[indiceEdicao].cpf = cpf.value
    ativos[indiceEdicao].data = data.value
    ativos[indiceEdicao].salario = salario.value
    ativos[indiceEdicao].funcao = funcao.value

    localStorage.setItem('ativos', JSON.stringify(ativos))
    alert(`Dados do funcionário e salário novo editados com sucesso`)
    nome.value = ''
    cpf.value = ''
    data.value = ''
    salario.value = ''
    funcao.value = ''
    edicao = false
    indiceEdicao = -1
    botaoCadastro.textContent = 'Cadastrar'

    return
  }

  if (!nome.value || !cpf.value || !data.value || !salario.value || !funcao.value) {
    alert('Preencha todos os campos corretamente')
    return
  }

  if (!/^[a-zA-Z-À-ý\s]+$/.test(nome.value)) {
    alert('O nome só deve conter letras')

    return
  }

  const cpfRep = ativos.some((e) => {
    return e.cpf == cpf.value
  })

  if (cpfRep) {
    alert('Este cpf já está cadastrado')

    return
  }

  if (!/^\d{11}$/.test(cpf.value)) {
    alert('O cpf precisa ter 11 números')

    return
  }

  if (salario.value <= 0) {
    alert('O salário precisa ser maior que 0')

    return
  }

  if (!/^[a-zA-Z-À-ý\s]+$/.test(funcao.value)) {
    alert('O nome só deve conter letras')

    return
  }

  const funcionario = {
    nome: nome.value,
    cpf: cpf.value,
    data: data.value,
    salario: salario.value,
    funcao: funcao.value,
    estado: 'Ativo',
  }

  ativos.push(funcionario)
  localStorage.setItem('ativos', JSON.stringify(ativos))
  alert(`Funcionário ${funcionario.nome} cadastrado`)
  nome.value = ''
  cpf.value = ''
  data.value = ''
  salario.value = ''
  funcao.value = ''
  listar()
}

listar()

function listar() {
  listaAtivo.innerHTML = `${ativos
    .map(
      (e, indice) => `<p>Nome: ${e.nome} || CPF: ${e.cpf} ||
                              Data: ${e.data} || Salário: ${e.salario} || Função: ${e.funcao} <button onclick='editar(${indice})'>Editar</button> <button onclick='desativar(${indice})'>Desativar</button>
                            </p>`,
    )
    .join('')}`

  listaDesativo.innerHTML = `${desativos
    .map(
      (e, indice) => `<p>Nome: ${e.nome} || CPF: ${e.cpf} ||
                              Data: ${e.data} || Salário: ${e.salario} || Função: ${e.funcao}
                            </p>`,
    )
    .join('')}`
}

function editar(i) {
  edicao = true
  const achar = ativos[i]
  indiceEdicao = i
  botaoCadastro.textContent = 'Editar'

  nome.value = achar.nome
  cpf.value = achar.cpf
  data.value = achar.data
  salario.value = achar.salario
  funcao.value = achar.funcao
}

function desativar(i) {
  const confirmar = confirm(`Deseja desativar o funcionário ${ativos[i].nome}?`)

  if (confirmar) {
    ativos[i].estado = 'Desativo'
    const funcionario = {
      nome: ativos[i].nome,
      cpf: ativos[i].cpf,
      data: ativos[i].data,
      salario: ativos[i].salario,
      funcao: ativos[i].funcao,
      estado: 'Desativo'
    }
    desativos.push(funcionario)
    localStorage.setItem('desativos', JSON.stringify(desativos))
    ativos.splice(i, 1)
    localStorage.setItem('ativos', JSON.stringify(ativos))
    listar()
  }else{
    alert('Desativação cancelada')
  }
}
