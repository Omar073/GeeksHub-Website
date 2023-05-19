import React from 'react';

function Features() {
  return (
      <section id="features" className="py-12">
        <div className="max-w-xl px-4 py-12 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">
          <h1 className="mb-8 text-2xl font-bold tracking-normal text-center text-gray-800 md:leading-tight md:tracking-normal dark:text-gray-200 md:text-4xl">
            Supporting the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-400">
            finest
          </span>{' '}
            and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-blue-400">
            richest
          </span>{' '}
            features.
          </h1>
          <p className="max-w-md mx-auto mb-10 text-lg text-gray-600 dark:text-gray-400 md:text-lg">
            Geeks Hub is introducing the best-in-class features at the most competitive prices.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-10 space-y-6">
              <h1 className="text-xl font-bold text-center text-violet-600 dark:text-blue-300 md:text-2xl sm:text-left">
                Unlimited Wifi
              </h1>
              <div className="h-auto">
                <a
                   
                    rel="noreferrer"
                    target="_blank"
                >
                  <img
                      className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                      src="../router.jpg"
                      alt="Placeholder for Next.js"
                      height={500}
                      width={500}
                  />
                </a>
              </div>
              <p className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
                Geeks Hub provides unlimited, high-speed internet access to ensure that members can work efficiently without any interruptions.
              </p>
            </div>
            <div className="mb-10 space-y-6">
              <h1 className="text-xl font-bold text-center text-violet-600  dark:text-blue-300 md:text-2xl sm:text-left">
                Private meeting rooms
              </h1>
              <div className="h-auto">
                <a

                    rel="noreferrer"
                    target="_blank"
                >
                  <img
                      className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                      src="../rooms.png"
                      alt="Placeholder for TailwindCSS JIT"
                  />
                </a>
              </div>
              <p className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
                Geeks Hub provides private meeting rooms for members who need a quiet space for meetings or calls.
              </p>
            </div>
            <div className="mb-10 space-y-6">
              <h1 className="text-xl font-bold text-center text-violet-600  dark:text-blue-300 md:text-2xl sm:text-left">
                3D printing
              </h1>
              <div className="h-auto">
                <a

                    rel="noreferrer"
                    target="_blank"
                >
                  <img
                      className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                      src="../printer.jpg"
                      alt="Placeholder for Dark Mode"
                      height={500}
                      width={500}
                  />
                </a>
              </div>
              <p className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
                Geeks Hub offers 24/7 3D printing services for all your project needs, print overnight without a care.
              </p>
            </div>
            <div className="mb-10 space-y-6">
              <h1 className="text-xl font-bold text-center text-violet-600  dark:text-blue-300 md:text-2xl sm:text-left">
                Unlimited coffee and tea
              </h1>
              <div className="h-auto">
                <a
                    rel="noreferrer"
                    target="_blank"
                >
                  <img
                      className="transition duration-700 rounded shadow-2xl h-80 hover:shadow-3xl md:hover:transform md:hover:scale-105"
                      src="../tea.jpg"
                      alt="Placeholder for Next-SEO"
                      height={500}
                      width={500}
                  />
                </a>
              </div>
              <p className="mx-2 font-normal text-gray-500 dark:text-gray-400 text-md">
                Members can enjoy unlimited coffee and tea at Geeks Hub, helping them stay energized and focused throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Features;