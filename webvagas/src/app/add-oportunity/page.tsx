'use client'

import { ChangeEvent, useState } from 'react'

export default function AdicionarOportunidade() {
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    localizacao: '',
    descricao: '',
    requisitos: '',
    salario: '',
  })


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }


  // const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   // Aqui você pode adicionar a lógica para enviar os dados para o backend
  //   console.log(formData)
  //   // Resetar o formulário após o envio
  //   setFormData({
  //     titulo: '',
  //     empresa: '',
  //     localizacao: '',
  //     descricao: '',
  //     requisitos: '',
  //     salario: '',
  //   })
  // }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Adicionar Nova Oportunidade</h1>
      <form 
      
      // onSubmit={handleSubmit} 
      
      className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título da Vaga</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            // onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="requisitos" className="block text-sm font-medium text-gray-700">Requisitos</label>
          <textarea
            id="requisitos"
            name="requisitos"
            value={formData.requisitos}
            // onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="salario" className="block text-sm font-medium text-gray-700">Salário</label>
          <input
            type="text"
            id="salario"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Adicionar Oportunidade
          </button>
        </div>
      </form>
    </div>
  )
}

