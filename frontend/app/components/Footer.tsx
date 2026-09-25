import Link from 'next/link'

interface FooterProps {
  copyright?: string
}

export default function Footer({ copyright }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100">
      <div className='flex flex-col items-center justify-center my-6'>
        {/* Direitos Autorais e Nome da Marca */}
        <div className="text-center md:text-left text-sm text-gray-800 select-none">
          <span>
            © {currentYear} {copyright || 'Como Cuidar de Cachorro'}. Todos os direitos reservados.
          </span>
        </div>

        {/* Links Internos Úteis / Institucionais */}
        <div className="flex items-center gap-4 text-sm text-gray-800"> 
          <Link 
            href="/termos" 
            className="hover:text-orange-500 transition-colors"
          >
            Termos de Uso
          </Link>
          <span>&middot;</span>
          <Link 
            href="/privacidade"
            className="hover:text-orange-500 transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>

        {/* Criador */}
        <div className='text-center md:text-left text-sm text-gray-800'>
          <span className=''>
            Feito por <strong><a href='https://celdigital.com.br' target='_blank' rel='noreferrer noopener'>CEL Digital</a></strong>
          </span>
        </div>
      </div>
    </footer>
  )
}