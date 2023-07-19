import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("userInfo");

      toast({
        title: `${data.message}`,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu as="div" className=" md:hidden relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="sm:mr-5 flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link
              to="#"
              className={
                "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-shade hover:text-white"
              }
            >
              View Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="#"
              className={
                "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-shade hover:text-white"
              }
            >
              Settings
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="#"
              className={
                "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-shade hover:text-white"
              }
              onClick={handleLogout}
            >
              Logout
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropDown;
