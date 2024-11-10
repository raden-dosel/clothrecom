import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ThemeProvider } from "@components/Theme_Provider";

export const metadata = {
  title: "Sample Website",
  description: "This is a sample website made with Clothrecom",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <Nav />
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
