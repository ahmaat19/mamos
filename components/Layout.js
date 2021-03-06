import Navigation from './Navigation'
import Head from 'next/head'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Mamos Business</title>
        <meta property='og:title' content='Mamos Business' key='title' />
      </Head>
      <Navigation />
      <main className='container py-2'>{children}</main>
      <Footer />
    </>
  )
}
