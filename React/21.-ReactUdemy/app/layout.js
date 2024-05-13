import './globals.css';
import MainHeader from '@/components/header-main/main-header';

//NOTE: The "metadata" object and "generateMetadata" function exports are only supported in Server Components.
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader/>
        {children}
      </body>
    </html>
  );
}
