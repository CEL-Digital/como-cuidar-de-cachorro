"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { urlForImage } from '@/sanity/lib/utils'

export default function Header({ settings }: { settings?: any }) {
  const menu = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-24 bg-white/80 backdrop-blur-lg border-b border-gray-100 flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex items-center justify-between gap-5">
                {/* Logo / Título vindo do Sanity */}
                <Link className="flex items-center gap-2" href="/">
                  {settings?.logo ? (
                    <Image
                      src={urlForImage(settings.logo)?.url() || ''}
                      alt={settings?.title || 'Logo'}
                      width={120}
                      height={40}
                      priority
                    />
                  ) : (
                    <span className="text-lg font-semibold sm:text-2xl">
                      {settings?.title || 'Como Cuidar de Cachorro'}
                    </span>
                  )}
                </Link>

                {/* Navegação Desktop */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                  {menu.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:text-blue-600 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-black px-5 py-2.5 text-white transition-colors hover:bg-blue-600"
                  >
                    View on GitHub
                  </Link>
                </nav>

                {/* Botão Hambúrguer Mobile */}
                <Disclosure.Button aria-label="Toggle Menu" className="rounded-md p-2 text-gray-500 hover:text-blue-600 md:hidden">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    {open ? (
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                    ) : (
                      <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    )}
                  </svg>
                </Disclosure.Button>
              </div>

              {/* Painel Mobile do Stablo */}
              <Disclosure.Panel className="md:hidden pt-4 pb-2">
                <div className="flex flex-col gap-3 text-center font-medium text-gray-600">
                  {menu.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:text-blue-600 py-1">
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-full bg-black px-5 py-2 text-white"
                  >
                    View on GitHub
                  </Link>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </header>
  )
}