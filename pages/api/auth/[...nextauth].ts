import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pb } from 'pages/main';

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

				const user = await pb.collection('users').authWithPassword(email, password);

				const id = pb.authStore.model?.id;

				if (!pb.authStore.isValid) {
					return null;
				}

				const record = await pb.collection('users').getOne(id as string, {
					expand: 'relField1,relField2.subRelField',
				});

				return { id, name: record.name, email, user };
			},
		}),
	],
};
export default NextAuth(authOptions);
