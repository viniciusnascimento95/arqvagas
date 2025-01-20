'use client'

import { BriefcaseIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const DashboardCard = ({ title, value, icon: Icon }) => (
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

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total de Vagas" value="42" icon={BriefcaseIcon} />
        <DashboardCard title="Candidaturas" value="128" icon={UserGroupIcon} />
        <DashboardCard title="Vagas Preenchidas" value="18" icon={ChartBarIcon} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Oportunidades</h2>
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Arquiteto Sênior</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Construtora XYZ</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">São Paulo, SP</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

