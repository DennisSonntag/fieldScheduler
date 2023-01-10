/* eslint-disable react/jsx-props-no-spreading */
import '@assets/main.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}
