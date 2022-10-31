import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

function App() {
  // Estados referentes as informações de País e Cidade
  const [pais, setPais] = useState([])
  const [cidade, setCidade] = useState([])

  // Desestruturação das funções da biblioteca react-hook-form
  const { register, handleSubmit, formState: {errors} } = useForm()

  // Faz as requisições para as APIs
  useEffect(() => {
    fetch('https://amazon-api.sellead.com/country')
      .then(response => response.json())
      .then(data => setPais(data))

      fetch('https://amazon-api.sellead.com/city')
      .then(response => response.json())
      .then(data => setCidade(data))
  }, [])

  // Gera uma lista de tags Options com os Países
  const paises = pais.map(p => {
     return <option key={p['id']} value={p['name_ptbr']}>{p['name_ptbr']}</option>
  })

  // Gera uma lista de tags Options com as Cidades
  const cidades = cidade.map(c => {
    const nome = c['name_ptbr']
    let nomeLista = []
    if (nome != null) {
      nomeLista = c['name_ptbr'].split(',')
      return <option key={c['id']} value={nomeLista[0]}>{nomeLista[0]}</option>
    } 
  })

  return (
    <div className="container">
      <form onSubmit={handleSubmit((data) => {
        console.log(data)
      })}>
        <div className="content">
          <div className="personalInfo">
            <h2>Dados Pessoais</h2>
            {/* Acompanha todos inputs e adiciona suas validações */}
            <input {...register("nome", {required: "Digite seu nome."})} type="text" placeholder='Nome' />
            <p>{errors.nome?.message}</p>

            <input {...register("email", {required: "Digite seu Email"})} type="email" placeholder='Email' />
            <p>{errors.email?.message}</p>

            <input {...register("tel", {required: "Digite seu Telefone"})} type="tel" placeholder='Telefone' />
            <p>{errors.tel?.message}</p>

            <input {...register("cpf", {required: "Digite seu CPF", minLength: {
              value: 11,
              message: "O CPF deve conter 11 números."
            }, maxLength: {
              value: 11,
              message: "O CPF deve conter 11 números."
            }})} type="text" placeholder='CPF' />
            <p>{errors.cpf?.message}</p>

          </div>
          <div className="InterestingPlaces">
          <h2>Destinos de Interesse</h2>
            <select {...register('pais', {required: "Escolha um País."})}>
              <option value="">-- Escolha --</option>
              {/* Adiciona a lista de tags <option> com as informações retornadas na API e tradatas */}
              {paises}
            </select>
            <p>{errors.pais?.message}</p>

            <select {...register('cidade', {required: "Escolha uma Cidade."})}>
              <option value="">-- Escolha --</option>
              {/* Adiciona a lista de tags <option> com as informações retornadas na API e tradatas */}
              {cidades}
            </select>
            <p>{errors.cidade?.message}</p>
            
          </div>
        </div>

        <input type="submit" />
      
      </form>
    </div>
  )
}

export default App
