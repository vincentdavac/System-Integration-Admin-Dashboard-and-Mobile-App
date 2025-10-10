import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../../public/icons/ucc_logo.png';
import { User, Mail, Lock, Phone, IdCard } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { AlertsContainerRef } from '../../components/Alert/AlertsContainer';
import School from '../../images/logo/school (1).svg';

interface RegisterProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const SignUp = ({ alertsRef }: RegisterProps) => {
  // Navigate Users when Logged in
  const navigate = useNavigate();

  const { setToken } = useContext(AppContext)!;

  // Form Data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    student_no: '', // Add this
    email: '',
    contact_number: '',
    hrm_password: '',
    hrm_password_confirmation: '',
  });

  async function handleRegister(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      // Clear old alerts first
      alertsRef.current?.clearAlerts();

      // Show detailed field errors
      Object.values(data.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert('error', msg);
        });
      });
    } else if (data.message) {
      // No field errors → show main message
      alertsRef.current?.clearAlerts();
      alertsRef.current?.addAlert('error', data.message);
    } else {
      console.log(data);

      // get token from data.data.token
      const newToken = data.data.token;

      localStorage.setItem('token', newToken);

      setToken(newToken);
      console.log({ newToken });

      alertsRef.current?.addAlert('success', 'Registration successful!');
      navigate('/admin/dashboard');
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <img
                    className="hidden dark:block"
                    width={600}
                    src={Logo}
                    alt="Logo"
                  />
                  <img
                    className="dark:hidden"
                    src={Logo}
                    width={600}
                    alt="Logo"
                  />
                </Link>
                {/* <p className="2xl:px-20">
                  Education is the most powerful tool we can use to shape a
                  better future
                </p>

                <span className="mt-15 inline-block -mt-3">
                  <img
                    src={School}
                    alt="School Illustration"
                    className="w-150 h-auto mx-auto"
                  />
                </span> */}
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">
                  Human Resource Management
                </span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Register your Account
                </h2>

                <form onSubmit={handleRegister}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="mb-4 w-full md:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              first_name: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter your first name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <User />
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 w-full md:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              last_name: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter your last name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <User />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <Mail />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="mb-4 w-full md:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Contact Number
                      </label>
                      <div className="relative">
                        <input
                          value={formData.contact_number}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact_number: e.target.value,
                            })
                          }
                          type="number"
                          placeholder="Enter your phone number"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <Phone />
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 w-full md:w-1/2">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Employee No.
                      </label>
                      <div className="relative">
                        <input
                          value={formData.student_no}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              student_no: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter employee number"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <IdCard />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        value={formData.hrm_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hrm_password: e.target.value,
                          })
                        }
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <Lock />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Re-type Password
                    </label>
                    <div className="relative">
                      <input
                        value={formData.hrm_password_confirmation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hrm_password_confirmation: e.target.value,
                          })
                        }
                        type="password"
                        placeholder="Re-enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <Lock />
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Create account"
                      className="w-full rounded-lg bg-[#367947] py-4 text-white font-medium transition"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?
                      <Link
                        to="/admin/login"
                        className="font-medium text-[#367947]"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
