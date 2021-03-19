import Head from 'next/head';
import Navbar from '../components/Navbar';
import Buttons from '../components/Buttons';
import DreamList from '../components/DreamList';
// import { table, simplifyRecords } from '../pages/api/utlis/Airtable';
import { useDreamsContext } from '../context/DreamsContext';
import { useEffect, useState } from 'react';
import { useUser, isLoading } from '@auth0/nextjs-auth0';
import Input from '../components/InputDream';
// import { getSession } from '@auth0/nextjs-auth0';

export default function Home() {
  const {
    dreams,
    setDreams,
    filteredDreams,
    setFilteredDreams,
  } = useDreamsContext();
  const { user } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Input />
      {!user && (
        <div
          className={`text-center text-2xl transition font-spartan font-bold text-very-dark-cyan ${
            show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="my-8">Test accounts:</h1>
          <p className="my-4">test1@dreamshop.com / testing@123</p>
          <p>test2@dreamshop.com / testing@123</p>
        </div>
      )}
      {user && (
        <>
          <Buttons />
          <DreamList dreams={filteredDreams} />
        </>
      )}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   try {
//     const dreams = await table.select({ view: 'Grid view' }).firstPage();
//     const simplifiedDreams = await simplifyRecords(dreams);
//     console.log(simplifiedDreams);

//     return {
//       props: {
//         initialDreams: simplifiedDreams,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         err: 'something wrong',
//       },
//     };
//   }
// }
