import {Suspense} from 'react'
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="relative">
        <div className="relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
          <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
          <div className="container">
            <div className="relative min-h-[30vh] mx-auto max-w-2xl pt-12 pb-16 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center text-center">
              <div className="flex flex-col gap-4 items-center">
                <div className="text-xs sm:text-sm leading-6 uppercase py-1 px-3 bg-amber-100 text-amber-900 font-mono tracking-wider rounded-full font-semibold">
                  Guia do Tutor Responsável
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900">
                  Como Cuidar de Cachorro
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-xl font-normal">
                  Dicas essenciais sobre saúde, alimentação, adestramento e bem-estar para o teu melhor amigo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição personalizada vinda do Sanity Studio (Site Settings) */}
        {settings?.description && (
          <div className="container relative mx-auto max-w-2xl pb-10 pt-4 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center">
            <div 
              className="prose sm:prose-lg text-gray-700 font-light text-center"
              data-sanity={dataAttr({
                id: settings._id,
                type: 'settings',
                path: 'description',
              }).toString()}
            >
              <PortableText value={settings.description} />
            </div>
          </div>
        )}
      </div>

      {/* Lista de Artigos do Blog */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense fallback={<div>A carregar posts...</div>}>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}