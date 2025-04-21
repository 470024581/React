import Head from 'next/head';
import Header from './Header';
import { Container } from 'react-bootstrap';

function Layout({ children, title = 'MERN CRUD App' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="MERN CRUD application built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container className="py-4">
        {children}
      </Container>
    </>
  );
}

export default Layout;