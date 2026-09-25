import {Suspense} from 'react'

import {AllPosts} from '@/app/components/Posts'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      {/* Lista de Artigos do Blog */}
      <div className="border-t border-gray-100">
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