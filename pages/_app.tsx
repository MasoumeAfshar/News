import "../styles/globals.scss";
import { Provider } from "react-redux";
import Head from "next/head";
import type { AppProps } from "next/app";
import store, { persistor } from "../redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "../components/Layout/index";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>News list</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}
