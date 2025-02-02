'use client'
import { useAuth } from '@/lib/authContext';
import { BellIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user } = useAuth();

  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Oportunidades para Arquitetos</h2>
        <div className="flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BellIcon className="h-6 w-6" />
          </button>
          <p>Usuário: {user?.email}</p>
          <img
            className="h-8 w-8 rounded-full ml-4"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  )
}

export default Header

