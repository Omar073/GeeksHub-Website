import Header from "./components/Header";
import Footer from "./components/Footer";


export default function ErorPage() {
  return (
    <div className="bg-white dark:bg-black">
      <Header />
     
      <div className="flex flex-col items-center justify-center px-10 bg-white h-[90vh] dark:bg-black md:flex-row md:space-x-6">
        <div className="space-x-2">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 md:text-8xl md:border-r-2 md:px-6">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            There was an error finding your page.
          </p>
          <p className="max-w-sm mb-8 text-md">
          Contact us for any problems or questions.
          </p>
          <a href="/" className="px-4 py-2.5 text-black dark:text-white border dark:hover:bg-white dark:hover:text-black rounded-lg shadow transition duration-300 hover:shadow-md">
           
              Return Home
            
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
