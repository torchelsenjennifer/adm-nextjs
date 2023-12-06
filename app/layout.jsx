import Titulo from '../components/Titulo'
import 'bootstrap/dist/css/bootstrap.css'

export const metadata = {
  title: 'Controle de Profissionais',
  description: 'Estudio Carta Branca Tatuaria, Tatuaria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="./cartaBranca.png" type="image/x-icon" />
      </head>
      <body>
        <Titulo />
        {children}
      </body>
    </html>
  )
}
