import Navbar from '../components/Navbar';
import Header from '../components/Header';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <Header /> 
      <div className="flex pt-20">
        <Navbar /> 
        <main className="flex-1 ml-20"> 
          <div className='w-full'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
