import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import { UserContext } from './context/UserContext';
import { auth, db } from './config/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const users = collection(db, 'users');
  const { authUserData, setauthUserData, update, setUpdate } = useContext(UserContext);
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(auth.currentUser);
      console.log(authUserData);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      setUpdate(update + 1);

      if (userDocSnap.exists()) {
        console.log('User document exists');
        if (userDocSnap.data().isAdmin) {
          navigate('/admin');
        } else if (userDocSnap.data().isEmployee) {
          navigate('/employee');
        } else {
          navigate('/home');
        }
      } else {
        console.log('User document does not exist');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img className="mx-auto w-48" src="logogeeks.png" alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">We are GeeksHub</h4>
                    </div>
  
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>
                      {/* Username input */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput1"
                          placeholder="Username"
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Username
                        </label>
                      </div>
  
                      {/* Password input */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Password
                        </label>
                      </div>
  
                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)",
                          }}
                        >
                          Log in
                        </button>
  
                        {/* Forgot password link */}
                        {/* <a href="#!">Forgot password?</a> */}
                      </div>
  
                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          onClick={() => navigate('/signup')}
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                
                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{ background: "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)" }}
                  >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    We are more than just a company
                  </h4>
                  <p className="text-sm">
                    "Welcome to GeeksHub! Find your perfect workspace and
                    unleash your productivity. Join our vibrant community of students,
                    professionals, and teams. Start collaborating, learning, and
                    achieving your goals in our modern co-working space."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}  


/*

Title: GeeksHub: Empowering Collaboration and Productivity

Introduction:
GeeksHub is a revolutionary co-working space project designed to create an environment where individuals, students, professionals, and teams can collaborate, learn, and achieve their goals. This innovative project aims to foster a vibrant community by providing a modern and dynamic workspace that stimulates creativity, productivity, and networking opportunities. GeeksHub goes beyond the conventional notion of a company and seeks to empower individuals to reach their full potential.

Creating the Perfect Workspace:
At GeeksHub, creating the perfect workspace is a top priority. The project offers a spacious and well-designed environment that caters to diverse needs. The physical layout of the workspace allows for flexibility and adaptability, enabling individuals and teams to customize their workstations according to their preferences. From open floor plans to private offices and meeting rooms, GeeksHub ensures that every workspace requirement is met. The ergonomic furniture, ample natural lighting, and state-of-the-art technology create a comfortable and efficient work environment.

Collaboration and Networking Opportunities:
GeeksHub recognizes the power of collaboration and networking in driving innovation and success. The project provides numerous avenues for individuals to connect, collaborate, and learn from one another. The co-working space is designed to encourage interaction and communication, fostering a sense of community among its members. Regular networking events, workshops, and seminars are organized to facilitate knowledge sharing and professional growth. GeeksHub serves as a hub for like-minded individuals to exchange ideas, form partnerships, and embark on new ventures.

Unleashing Productivity:
GeeksHub understands that productivity is essential for personal and professional growth. To enhance productivity, the project offers various amenities and resources. High-speed internet connectivity ensures seamless communication and access to online resources. Additionally, GeeksHub provides state-of-the-art technology infrastructure, including advanced printers, scanners, and video conferencing facilities, to meet the diverse needs of its members. The availability of on-site support and administrative services further eliminates distractions and allows individuals to focus on their work.

Community and Support:
GeeksHub believes in the power of community and support in fostering growth and success. The project facilitates a strong sense of community by organizing social events, team-building activities, and networking opportunities. Members have access to a dedicated community manager who assists in connecting individuals and fostering collaboration. Furthermore, GeeksHub offers mentorship programs and access to industry experts to provide guidance and support to its members. The project recognizes that the collective knowledge and support of a community can propel individuals towards their goals.

Conclusion:
GeeksHub stands as a testament to the changing landscape of work environments. By providing a dynamic and collaborative space, GeeksHub empowers individuals, students, professionals, and teams to unlock their full potential. The project's commitment to creating the perfect workspace, fostering collaboration and networking opportunities, unleashing productivity, and building a supportive community sets it apart from traditional co-working spaces. GeeksHub is not merely a company; it is a catalyst for growth, innovation, and success. Through GeeksHub, individuals can thrive in an environment that nurtures their aspirations and facilitates their journey towards excellence.

*/