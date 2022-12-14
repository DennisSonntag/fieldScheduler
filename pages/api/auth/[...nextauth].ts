import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			// @ts-ignore
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				await pb.collection('users').authWithPassword(email, password);
				const id = pb.authStore.model?.id;
				const record = await pb.collection('users').getOne(id as string, {
					expand: 'relField1,relField2.subRelField',
				});

				return { id, name: record.name, email };
			},
		}),
	],
};
export default NextAuth(authOptions);
