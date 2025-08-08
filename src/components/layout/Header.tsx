import { useEffect, useState } from "react";

// Import necessary utilities
import { isTokenValid, removeUser } from "@/lib/cookies";
import type { UserType } from "@/types";

// Import UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

// Import Link from react-router-dom for navigation
import { Link, useLocation, useNavigate } from "react-router-dom";

// Import authentication service
import { getUser, logout } from "@/services/api/auth";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { FaBars } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";

const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // To get location
  const location = useLocation();

  const handleLogout = () => {
    logout();
    removeUser();
    navigate("/");
  };

  useEffect(() => {
    // Check if the token is valid when the component mounts
    const checkToken = isTokenValid();
    // Update the state based on the token validity
    setIsUserAuthenticated(checkToken);
  }, []);

  // Fetch user if component mount
  const fetchUser = async (): Promise<void> => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isUserAuthenticated ? (
        <Disclosure as="header">
          {({ open }) => (
            <>
              <div
                className={`fixed z-50 flex w-full items-center justify-between p-4 transition-all duration-300 ${
                  isScrolled ? "bg-white shadow-md" : "bg-transparent"
                }`}
              >
                {/* Logo or title for the application */}
                <div
                  className={`text-lg font-bold ${location.pathname === "/" ? "text-white" : "text-black"}`}
                >
                  Travel Article App
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:space-x-10">
                  <div className="dropdown dropdown-start">
                    <div
                      tabIndex={0}
                      className={`hover:cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black"}`}
                    >
                      Article
                    </div>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link to="/articles">List Article</Link>
                      </li>
                      <li>
                        <Link to="/articles/create">Create Article</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown dropdown-start">
                    <div
                      tabIndex={0}
                      className={`hover:cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black"}`}
                    >
                      Category
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link to="/category">List Category</Link>
                      </li>
                      <li>
                        <Link to="/category/create">Create Category</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown dropdown-start">
                    <div
                      tabIndex={0}
                      className={`hover:cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black"}`}
                    >
                      Comments
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link to="/comments">New Comments</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Desktop Avatar */}
                <div className="hidden md:flex md:items-center">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="hover:cursor-pointer">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>

                  <p
                    className={`${location.pathname === "/" ? "text-white" : ""} ml-2`}
                  >
                    {user ? user.username : "not detected"}
                  </p>
                </div>

                {/* Mobile menu button */}
                <DisclosureButton
                  className={`relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden md:hidden ${location.pathname === "/" ? "text-white" : "text-gray-700"}`}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <FaBars
                    aria-hidden="true"
                    className={`block size-6 ${open ? "hidden" : "block"}`}
                  />
                  <HiMiniXMark
                    aria-hidden="true"
                    className={`size-6 ${open ? "block" : "hidden"}`}
                  />
                </DisclosureButton>
              </div>

              {/* Mobile menu panel */}
              <DisclosurePanel className="fixed top-16 right-0 left-0 z-40 bg-white shadow-lg md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {/* User Profile Section */}
                  <div className="flex items-center border-b border-gray-200 px-3 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-900">
                        {user ? user.username : "not detected"}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {/* Article Section */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        Article
                      </p>
                      <div className="mt-1 space-y-1">
                        <Link
                          to="/articles"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          List Article
                        </Link>
                        <Link
                          to="/articles/create"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Create Article
                        </Link>
                      </div>
                    </div>

                    {/* Category Section */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        Category
                      </p>
                      <div className="mt-1 space-y-1">
                        <Link
                          to="/category"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          List Category
                        </Link>
                        <Link
                          to="/category/create"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Create Category
                        </Link>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        Comments
                      </p>
                      <div className="mt-1 space-y-1">
                        <Link
                          to="/comments"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          New Comments
                        </Link>
                      </div>
                    </div>

                    {/* Profile & Logout Section */}
                    <div className="border-t border-gray-200 px-3 py-2">
                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ) : (
        <>
          <Disclosure as="nav">
            <header
              className={`fixed z-50 flex w-full items-center justify-between p-4 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
              }`}
            >
              {/* Logo or title for the application */}
              <div
                className={`text-lg font-bold ${location.pathname === "/" ? "text-white" : "text-black"}`}
              >
                Travel Article App
              </div>

              {/* Mobile button */}
              <DisclosureButton className="group focus:ring- relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden sm:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <FaBars
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <HiMiniXMark
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>

              <DisclosurePanel className="absolute top-16 right-0 left-0 z-40 bg-white shadow-lg sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {/* Navigation links for unauthenticated users */}
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              </DisclosurePanel>

              {/* Navigation links for unauthenticated users */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
              </div>
            </header>
          </Disclosure>
        </>
      )}
    </>
  );
};

export default Header;
