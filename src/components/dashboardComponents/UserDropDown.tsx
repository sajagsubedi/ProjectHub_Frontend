"use client";

import { useAuth } from "@/context/AuthProviders";
import { SIGN_OUT, GET_AUTHUSER } from "@/graphql";
import { useMutation, ApolloError } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UserDropDownProps {
  userDropDown: boolean;
  changeUserDropDown: (value: boolean) => void;
}

const UserDropDown = ({
  userDropDown,
  changeUserDropDown,
}: UserDropDownProps) => {
  const { user, refetchUser, loading } = useAuth();
  const router = useRouter();

  const [signout, { loading: signoutLoading }] = useMutation(SIGN_OUT, {
    // Optionally update the cache to clear the authUser
    update(cache) {
      cache.writeQuery({
        query: GET_AUTHUSER,
        data: { authUser: null },
      });
    },
  });

  const handleSignout = async () => {
    try {
      await signout();
      // Clear tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Refetch user to update the auth state
      refetchUser();
      toast.success("Signed out successfully");
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error.message || "Failed to sign out");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Show nothing or a fallback if no user is present
  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0"
        onClick={() => changeUserDropDown(!userDropDown)}
      >
        <Image
          className="w-8 h-8 rounded-full"
          src={user?.avatar?.url || "/user.png"}
          alt="user photo"
          width={32}
          height={32}
        />
      </button>
      {/* Dropdown menu */}
      <div
        className={`z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-5 max-w-[170px] overflow-hidden
          transition-all duration-300 ease-in-out ${
            !userDropDown ? "h-0" : "h-56"
          }`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 truncate">
            {user?.fullName}
          </span>
          <span className="block text-sm text-gray-500 truncate">
            {user?.email}
          </span>
        </div>
        <ul className="py-2">
          <li>
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/notifications"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              className="block px-4 py-2 text-sm w-full text-start text-gray-700 hover:bg-gray-100 truncate"
              onClick={handleSignout}
              disabled={signoutLoading}
            >
              {signoutLoading ? "Signing out..." : "Sign out"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropDown;
