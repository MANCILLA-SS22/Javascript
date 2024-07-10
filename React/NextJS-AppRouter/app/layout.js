import './globals.css';
import MainHeader from '@/components/header-main/main-header';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader/>
        {children} {/* Here are rendered the rest of the layouts coming from the nested components */}
      </body>
    </html>
  );
};

export default RootLayout;