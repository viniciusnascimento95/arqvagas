'use client'

import { api } from '@/services/api'
import { BriefcaseIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const DashboardCard = ({
  title,
  value,
  icon: Icon
}: {
  title: string
  value: number
  icon: React.ElementType
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="rounded-full bg-blue-100 p-3 mr-4">
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  </div>
)

interface Oportunity {
  id: string
  jobTitle: string
  companyInfo: {
    name: string
    industry: string
  }
  location: string
  publicationDate: Date
  applicationDeadline: Date
  isAvailable: boolean
}

export default function Home() {

  const [data, setData] = useState<Oportunity[]>([]);

  const [totJob, setTotJob] = useState(0);
  const [totUser, setTotUser] = useState(0);

  useEffect(() => {
    api.get('/oportunity').then((res) => {
      setData(res.data.slice(-7))
      setTotJob(res.data.length)
    })

    api.get('/user').then((res) => {
      setTotUser(res.data.length)
    })
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Arq Vagas Brasil</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total de Vagas" value={totJob} icon={BriefcaseIcon} />
        <DashboardCard title="Usuários" value={totUser} icon={UserGroupIcon} />
        <DashboardCard title="Vagas Preenchidas" value={10} icon={ChartBarIcon} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Oportunidades Cadastradas</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Exemplo de linha, você pode adicionar mais conforme necessário */}
            {data && data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.companyInfo.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.publicationDate).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

