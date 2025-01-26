'use client'

import { api } from '@/services/api'
import { MagnifyingGlassIcon, PencilIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'

type CompanyProps = {
  name: string
  industry: string
  teamSize: string
}

interface Oportunity {
  id: number
  applicationDeadline: string
  availablePositions: number
  benefits: string[]
  companyInfo: CompanyProps
  contractType: string
  createdAt: string
  expectedStartDate: string
  experienceLevel: string
  isAvailable: boolean
  jobDescription: string
  jobTitle: string
  location: string
  mainResponsibilities: string[]
  publicationDate: string
  requirements: string[]
  toolsAndSoftware: string[]
  updatedAt: string
  workSchedule: string
}
export default function AdministrarOportunidades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOportunidade, setSelectedOportunidade] = useState<Oportunity | null>(null)
  const [oportunidades, setOportunidades] = useState<Oportunity[]>([])

  const router = useRouter();

  useEffect(() => {
    api.get('/oportunity').then((res) => {
      console.log(res.data)
      setOportunidades(res.data)
    })
  }, [])

  const itemsPerPage = 12
  const filteredOportunidades = oportunidades.filter(oportunidade =>
    oportunidade.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oportunidade.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredOportunidades.length / itemsPerPage)
  const paginatedOportunidades = filteredOportunidades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (oportunidade: Oportunity) => {
    setSelectedOportunidade(oportunidade)
    setIsModalOpen(true)
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Administrar Oportunidades</h1>

      {/* Barra de pesquisa */}
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar oportunidades..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Tabela de oportunidades */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Publicação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOportunidades.map((oportunidade) => (
              <tr key={oportunidade.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{oportunidade.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{oportunidade.companyInfo.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{oportunidade.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(oportunidade.createdAt).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => { router.push(`/list-oportunity/${oportunidade.id}/edit`) }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openModal(oportunidade)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <UserGroupIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal para visualizar candidatos */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOportunidade && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Candidatos para {selectedOportunidade.jobTitle}</h2>
            <p className="mb-2">Total de candidatos: {selectedOportunidade.availablePositions}</p>
            <p className="mb-2">Previsão de contrato: {selectedOportunidade.workSchedule}</p>
            {/* Aqui você pode adicionar uma lista de candidatos quando tiver esses dados */}
            <p>Lista de candidatos será exibida aqui.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

