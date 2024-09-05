import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return { email: user.email };
            }
        })
    ],
});

//We use a dynamic catch-all API route which catches all unknown routes that start with api/auth. We need this catch all route because the NextAuth package behind the scenes will expose multiple routes for 
//user login and for user logout.