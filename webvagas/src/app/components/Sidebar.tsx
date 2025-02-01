'use client'

import { logout } from '@/lib/auth'
import { BriefcaseIcon, ClipboardDocumentListIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Sidebar = () => {

  const pathname = usePathname(); 

  if (pathname === '/login') {
    return null; // Retorna null para ocultar o Sidebar quando a rota é "/login"
  }

  return (

    <div className="bg-white w-64 h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-blue-600">Admin Dashboard</h1>
      </div>
      <nav className="mt-6">
        <Link href="/admin" className="flex items-center py-2 px-4 text-gray-700 hover:bg-blue-100">
          <HomeIcon className="h-5 w-5 mr-2" />
          Dashboard
        </Link>
        <Link href="/add-oportunity" className="flex items-center py-2 px-4 text-gray-700 hover:bg-blue-100">
          <BriefcaseIcon className="h-5 w-5 mr-2" />
          Adicionar
        </Link>
        <Link href="/list-oportunity" className="flex items-center py-2 px-4 text-gray-700 hover:bg-blue-100">
          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
          Oportunidades
        </Link>
        <Link href="/login" onClick={() => logout()} className="flex items-center py-2 px-4 text-gray-700 hover:bg-blue-100">
          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
          Sair
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar