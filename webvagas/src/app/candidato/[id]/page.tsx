'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
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
  createdAt: string
}
export default function DetailOportunity() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    phone: '',
    email: '',
    school: '',
    init_date_school: '',
    end_date_school: '',
    personal_skills: [],
    software_skills: [],
    portfolio_url: '',
    createdAt: ''
  });

  const router = useRouter();
  const { id } = useParams();

  const { toast } = useToast()


  useEffect(() => {
    if (id) {
      api.get(`user/${id}/showUser`).then((res) => {
        console.log('=>res --->', typeof res.data);
        setUser(res.data)
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

      {user.email !== '' ?
        <div className="max-w-full mx-auto p-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">

              <h2 className="text-lg leading-6 font-medium text-gray-900">{user.name}</h2>
              <Button
                onClick={featureDevelop}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-200">
                <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
                Exportar em PDF
              </Button>
            </div>

            {user && <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">E-mail</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Escola / Formação </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.school}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Início formação </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.init_date_school ? new Date(user.init_date_school).toLocaleDateString('pt-BR') : ''}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Final formação </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.end_date_school ? new Date(user.end_date_school).toLocaleDateString('pt-BR') : ''}</dd>
                </div>

                {user.portfolio_url && <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Link portifólio</dt>
                  <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2">
                    <Link target='_blank' href={user.portfolio_url}>Portifólio</Link>
                  </dd>
                </div>}

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Data de cadastro usuário</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user ? new Date(user.createdAt).toLocaleDateString('pt-BR') : ''}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Habilidades Soft skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {user.software_skills.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Habilidades Pessoal</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {user.personal_skills.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>}
          </div>
        </div>
        :
        <div className="max-w-full mx-auto p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Carregando...</h2>
          <Progress value={50} className="w-[60%]" />
        </div>
      }
    </div>
  )
}
