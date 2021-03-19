import '../styles/globals.css';
import { DreamsProvider } from '../context/DreamsContext';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <DreamsProvider>
        <div className="">
          <Component {...pageProps} />
        </div>
      </DreamsProvider>
    </UserProvider>
  );
}

export default MyApp;
