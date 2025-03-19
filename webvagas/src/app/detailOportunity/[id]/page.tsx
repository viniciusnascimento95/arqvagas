'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { AcademicCapIcon, CalendarDaysIcon, DocumentArrowDownIcon, EnvelopeIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import * as ExcelJS from 'exceljs'
import { ChevronLeftIcon, ChevronRightIcon, PhoneIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


interface OportunityProps {
  id: string,
  jobTitle: string,
  contractType: string,
  requirements: [],
  jobDescription: string,
  experienceLevel: string,
  benefits: [],
  location: string,
  workSchedule: string,
  availablePositions: string,
  expectedStartDate: Date,
  companyInfo: {
    name: string,
    industry: string,
  },
  mainResponsibilities: [],
  toolsAndSoftware: [],
  publicationDate: Date | null | undefined,
  applicationDeadline: '',
  isAvailable: true,
}

interface User {
  id: number
  userId: number
  oportunityId: number
  appliedAt: string
  comment: string
  user: {
    id: number
    name: string
    phone: string
    email: string
    school: string
    init_date_school: string
    end_date_school: string
    personal_skills: string[]
    software_skills: string[]
    portfolio_url: string
  }
}
export default function DetailOportunity() {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [job, setJob] = useState<OportunityProps | null>(null)
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast()

  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (id) {
      Promise.all([
        api.get(`oportunity/${id}`),
        api.get(`/oportunity/${id}/applications`)
      ]).then(([jobRes, usersRes]) => {
        setJob(jobRes.data)
        setUsers(usersRes.data)
      })
    }
  }, [id])

  function featureDevelop() {
    toast({
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
      ),
      variant: 'default',
      title: "Função em desenvolvimento!",
      description: "Por favor aguarde até que a função seja desenvolvida.",
    })
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()}>Voltar</Button>

      <div className="max-w-full mx-auto p-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between">

            <h2 className="text-lg leading-6 font-medium text-gray-900">Detalhes da Oportunidade:  {job?.jobTitle}</h2>
            <Button variant="default" onClick={() => setShowFull(!showFull)}>{showFull ? "Ver Menos" : "Ver detalhes"}</Button>
          </div>
          {showFull && <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.companyInfo.name}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Setor</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.companyInfo.industry}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Localização</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.location}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Data de Publicação</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {job?.publicationDate ? new Date(job.publicationDate).toLocaleDateString('pt-BR') : ''}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Carga horária</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.workSchedule}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job?.jobDescription}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Requisitos</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Beneficios</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.benefits.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ferramentas</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.toolsAndSoftware.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Responsabilidades</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.mainResponsibilities.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>}

        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
          <div className="px-4 py-5 sm:px-6">
            <div className='flex justify-between items-center'>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Candidatos </h2>

              {users.length > 0 && <div className="mt-1 max-w-2xl flex space-x-2">
                <Button
                  onClick={featureDevelop}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-red-400 hover:bg-gray-200">
                  <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
                  PDF
                </Button>
                <Button
                  onClick={async () => {
                    const workbook = new ExcelJS.Workbook()
                    const worksheet = workbook.addWorksheet('Candidatos')

                    worksheet.columns = [
                      { header: 'Nome', key: 'name', width: 30 },
                      { header: 'Email', key: 'email', width: 30 },
                      { header: 'Telefone', key: 'phone', width: 20 },
                      { header: 'Escola', key: 'school', width: 30 },
                      { header: 'Data Conclusão', key: 'endDate', width: 20 }
                    ]

                    users.forEach(candidato => {
                      worksheet.addRow({
                        name: candidato.user.name,
                        email: candidato.user.email,
                        phone: candidato.user.phone,
                        school: candidato.user.school || '-',
                        endDate: candidato.user.end_date_school ?
                          new Date(candidato.user.end_date_school).toLocaleDateString('pt-BR') : '-'
                      })
                    })

                    const buffer = await workbook.xlsx.writeBuffer()
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `candidatos-${job?.jobTitle}_${new Date().toISOString().split('T')[0].split('-').reverse().join('-')}.xlsx`
                    link.click()
                    window.URL.revokeObjectURL(url)
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-green-300 hover:bg-gray-200">
                  <TableCellsIcon className="h-5 w-5 mr-1" />
                  Excel
                </Button>              </div>}
            </div>
            <div className='flex justify-between items-center'>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Lista de pessoas que se candidataram para esta oportunidade
              </p>
              <p className='text-sm text-gray-500'>Total: {users.length}</p>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">

              {users?.slice((currentPage - 1) * 10, currentPage * 10).map((candidato) => (
                <li key={candidato?.user.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserCircleIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidato.user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {candidato.user.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {candidato?.user.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4">
                        {candidato.user.school &&
                          <div className="text-sm text-gray-500 flex items-center">
                            <AcademicCapIcon className="h-4 w-4 mr-1" />
                            {candidato.user.school}
                          </div>
                        }

                        {candidato.user.end_date_school && <div className="text-sm text-gray-500 flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          Conclusão: {new Date(candidato.user.end_date_school).toLocaleDateString('pt-BR')}
                        </div>
                        }
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/candidato/${candidato.user.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </li>
              ))}

              {users.length === 0 && (
                <div className="px-4 py-4 sm:px-6">
                  <p className="text-lg text-gray-800 text-center">Nenhum candidato encontrado :(</p>
                </div>
              )}
            </ul>


            {/* Paginação */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage < Math.ceil(users.length / 10) ? currentPage + 1 : currentPage)}
                  disabled={currentPage >= Math.ceil(users.length / 10)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Próximo
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> até{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * 10, users.length)}
                    </span> de{' '}
                    <span className="font-medium">{users.length}</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Anterior</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {[...Array(Math.ceil(users.length / 10))].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(currentPage < Math.ceil(users.length / 10) ? currentPage + 1 : currentPage)}
                      disabled={currentPage >= Math.ceil(users.length / 10)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Próximo</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
