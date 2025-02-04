'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline'
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

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    api.get('/oportunity').then((res) => {
      console.log(res.data)
      setOportunidades(res.data)
    })
  }, [])

  const itemsPerPage = 10
  const filteredOportunidades = oportunidades
    .sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable))
    .filter(oportunidade =>
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

  const openModalEdit = (oportunidade: Oportunity) => {
    setSelectedOportunidade(oportunidade)
    setIsOpenEdit(true)
  }

  const handleOpenModalDelete = (oportunidade: Oportunity) => {
    setSelectedOportunidade(oportunidade);
    setIsOpen(true);
  };

  function handleDelete() {
    api.delete(`/oportunity/${selectedOportunidade?.id}`).then(() => {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        variant: 'destructive',
        title: "Oportunidade excluída com sucesso!",
        description: "A oportunidade foi removida com sucesso.",
      })
      setOportunidades([])
    }).finally(() => api.get('/oportunity').then((res) => setOportunidades(res.data)));
    setIsOpen(false);
  }

  function handleEdit() {
    api.put(`/oportunity/${selectedOportunidade?.id}/status`, {
      status: !selectedOportunidade?.isAvailable
    }).then(() => {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        variant: 'default',
        title: "Oportunidade foi atualizada o status com sucesso!",
        description: `${selectedOportunidade?.jobTitle} foi ${selectedOportunidade?.isAvailable ? 'finalizada' : 'aberto'}.`,
      })
      setOportunidades([])
    }).finally(() => api.get('/oportunity').then((res) => setOportunidades(res.data)));
    setIsOpenEdit(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Administrar Oportunidades </h1>

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOportunidades.map((oportunidade) => (
              <tr key={oportunidade.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{oportunidade.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{oportunidade.companyInfo.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{oportunidade.location.length > 10 ? `${oportunidade.location.substring(0, 20)}...` : oportunidade.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(oportunidade.createdAt).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost"
                    onClick={() => openModalEdit(oportunidade)}
                  >
                    {oportunidade.isAvailable ? <Badge variant="outline">Aberto</Badge> : <Badge variant="destructive">Finalizada</Badge>}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {oportunidade.isAvailable && <button
                    onClick={() => { router.push(`/list-oportunity/${oportunidade.id}/edit`) }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>}

                  <button
                    onClick={() => openModal(oportunidade)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <UserGroupIcon className="h-5 w-5" />
                  </button>

                  {oportunidade.isAvailable && <button
                    onClick={() => handleOpenModalDelete(oportunidade)}
                    className="text-gray-600 hover:text-green-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>}
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

      {/* Dialog */}
      <Dialog
        open={isOpen} onOpenChange={setIsOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza de que deseja excluir este dado? Essa ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive"
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog edit status*/}
      <Dialog
        open={isOpenEdit}
        onOpenChange={setIsOpenEdit}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edição de status {selectedOportunidade?.isAvailable ? <Badge variant="outline">Aberto</Badge> : <Badge variant="destructive">Finalizada</Badge>}</DialogTitle>
          </DialogHeader>
          <p>Tem certeza de que deseja alterar o status da oportunidade?</p>
          <DialogFooter>
            <Button variant="outline"
              onClick={() => setIsOpenEdit(false)}
            >
              Cancelar
            </Button>
            <Button variant="default"
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Atualizar status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

