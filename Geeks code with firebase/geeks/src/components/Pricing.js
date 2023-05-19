const Feature = ({ description }) => {
  return (
      <li className="flex mb-1 space-x-3">
        <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-500 w-7"
            aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">{description}</span>
      </li>
  );
};

export default function Pricing() {
  return (
      <section id="pricing" className="py-12">
        <div className="max-w-xl px-4 py-12 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">
          <h1 className="mb-8 text-2xl font-bold tracking-normal text-center text-gray-800 md:leading-tight md:tracking-normal dark:text-gray-200 md:text-4xl">
            All with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-rose-400">
            affordable
          </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-indigo-400">
            friendly
          </span>{" "}
            pricing.
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-5 mt-5 mb-10 space-y-6 border border-indigo-500 shadow-md rounded-2xl">
              <h1 className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-300 md:text-2xl sm:text-left">
                Basic
              </h1>

              <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $10
              </span>
                <span className="text-base font-medium text-gray-500">/hour</span>
                <a
                    href="#"
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
                >
                  Get Started
                </a>
              </div>
              <div className="w-full border border-gray-300 dark:border-gray-500" />
              <h1 className="text-sm font-semibold text-gray-500 uppercase">
                What&apos;s included
              </h1>
              <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
                <ul>
                  <Feature description="Pay as you go, charges by the hour" />
                  <Feature description="Access to all the features you love" />
                </ul>
              </div>
            </div>
            <div className="p-5 mb-10 space-y-6 border-2 border-rose-300 dark:border-rose-300 rounded-2xl">
              <h1 className="text-xl font-bold text-center text-rose-600 dark:text-rose-300 md:text-2xl sm:text-left">
                Premium
              </h1>
              <p className="text-gray-600 text-md dark:text-gray-400">
                Most robust package, recomended by geeks!
              </p>
              <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $350
              </span>
                <span className="text-base font-medium text-gray-500">/month</span>
                <a
                    href="#"
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
                >
                  Get Started
                </a>
              </div>
              <div className="w-full border border-gray-300 dark:border-gray-500" />
              <h1 className="text-sm font-semibold text-gray-500 uppercase">
                What&apos;s included
              </h1>
              <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
                <ul>
                  <Feature description="Our Largest package" />
                  <Feature description="VIP treatment, book rooms completely for your geek group" />
                  <Feature description="60 hours of worry free work" />
                </ul>
              </div>
            </div>
            <div className="p-5 mt-5 mb-10 space-y-6 border border-indigo-500 shadow-md rounded-2xl">
              <h1 className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-300 md:text-2xl sm:text-left">
                Subscriber
              </h1>

              <div className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                $200
              </span>
                <span className="text-base font-medium text-gray-500">/month</span>
                <a
                    href="#"
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-gray-300 transition duration-300 bg-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-200 dark:bg-gray-800"
                >
                  Get Started
                </a>
              </div>
              <div className="w-full border border-gray-300 dark:border-gray-500" />
              <h1 className="text-sm font-semibold text-gray-500 uppercase">
                What&apos;s included
              </h1>
              <div className="font-normal text-gray-500 dark:text-gray-400 text-md">
                <ul>
                  <Feature description="The smaller subscription package" />
                  <Feature description="Fit for geeks working on week-long projects" />
                  <Feature description="30 hours, don't worry about payment as you leave" />

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
