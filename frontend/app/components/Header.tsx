"use client"

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition, Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { urlForImage } from '@/sanity/lib/utils'

interface MenuItem {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

export default function Header({ settings }: { settings?: any }) {
  // 1. Definição do Menu Esquerdo
  const leftMenu: MenuItem[] = [
    {
      label: 'Categorias',
      children: [
        { label: 'Alimentação', href: '/categoria/alimentacao' },
        { label: 'Saúde', href: '/categoria/saude' },
        { label: 'Adestramento', href: '/categoria/adestramento' },
      ],
    },
    {
      label: 'Raças',
      children: [
        { label: 'Golden Retriever', href: '/racas/golden-retriever' },
        { label: 'Shih Tzu', href: '/racas/shih-tzu' },
        { label: 'Poodle', href: '/racas/poodle' },
      ],
    },
  ]

  // 2. Definição do Menu Direito
  const rightMenu: MenuItem[] = [
    { label: 'Posts', href: '/posts' },
    { label: 'Sobre', href: '/about' },
  ]

  // Menu completo para a versão Mobile
  const mobileMenu = [...leftMenu, ...rightMenu]

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-24 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto h-full px-4 sm:px-6">
        <Disclosure as="nav" className="h-full flex items-center justify-between">
          {({ open }) => (
            <>
              {/* DESKTOP: Navegação da Esquerda */}
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-2">
                {leftMenu.map((item, index) => (
                  <Fragment key={`${item.label}-${index}`}>
                    {item.children ? (
                      <DropdownMenu item={item} />
                    ) : (
                      <Link
                        href={item.href || '#'}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* LOGO CENTRALIZADA */}
              <div className="flex items-center justify-between w-full md:w-auto md:px-8">
                <Link className="flex items-center gap-2 shrink-0" href="/">
                  {settings?.logo ? (
                    <Image
                      src={urlForImage(settings.logo)?.url() || ''}
                      alt={settings?.title || 'Logo'}
                      width={240}
                      height={80}
                      priority
                      className="h-26 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-900 sm:text-2xl">
                      {settings?.title || 'Como Cuidar de Cachorro'}
                    </span>
                  )}
                </Link>

                {/* Botão Hambúrguer Mobile */}
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="rounded-md p-2 text-gray-500 hover:text-orange-500 focus:outline-none md:hidden"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    {open ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
              </div>

              {/* DESKTOP: Navegação da Direita */}
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-start md:gap-2">
                {rightMenu.map((item, index) => (
                  <Fragment key={`${item.label}-${index}`}>
                    {item.children ? (
                      <DropdownMenu item={item} />
                    ) : (
                      <Link
                        href={item.href || '#'}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* MOBILE: Painel Desdobrável */}
              <Disclosure.Panel className="absolute top-24 left-0 w-full bg-white border-b border-gray-100 p-4 shadow-lg md:hidden">
                <div className="flex flex-col gap-2">
                  {mobileMenu.map((item, index) => (
                    <div key={`${item.label}-${index}`}>
                      {item.children ? (
                        <div className="flex flex-col gap-1">
                          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {item.label}
                          </span>
                          {item.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="pl-6 pr-3 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-500"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={item.href || '#'}
                          className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-500"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </header>
  )
}

// Componente para itens do menu que possuem Dropdown
function DropdownMenu({ item }: { item: MenuItem }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none ${
              open ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            <span>{item.label}</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? 'rotate-180 text-orange-500' : 'text-gray-400'
              }`}
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {item.children?.map((subItem) => (
                <Menu.Item key={subItem.href}>
                  {({ active }) => (
                    <Link
                      href={subItem.href}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        active ? 'bg-orange-50 text-orange-500' : 'text-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}