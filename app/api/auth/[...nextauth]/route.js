import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // This function is called whenever a session is checked
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    // This function is called whenever a user logs in
    async signIn({ profile }) {
      try {
        await connectDB();
        //Check if the user already exists in the database
        const userAlreadyExists = await User.findOne({ email: profile.email });
        // If the user does not exist, create a new user in the database
        if (!userAlreadyExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("ERROR while logging in MONGODB:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
