import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  DoorOpen,
  CircleUserRound,
  HeartHandshake,
  BanknoteArrowDown,
} from 'lucide-react';

export default function MobileButton() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#318134] ">
      <div className="flex justify-around items-center py-2">
        <Link
          to="/mobile/leave"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <DoorOpen
            className={`h-6 w-6 ${
              pathname === '/mobile/leave' ||
              pathname === '/mobile/leave-apply' ||
              pathname === '/mobile/leave-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          />
          <span
            className={`text-xs ${
              pathname === '/mobile/leave' ||
              pathname === '/mobile/leave-apply' ||
              pathname === '/mobile/leave-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          >
            Leave
          </span>
        </Link>

        <Link
          to="/mobile/loan"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <BanknoteArrowDown
            className={`h-6 w-6 ${
              pathname === '/mobile/loan' || pathname === '/mobile/loan-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          />
          <span
            className={`text-xs ${
              pathname === '/mobile/loan' || pathname === '/mobile/loan-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          >
            Loan{' '}
          </span>
        </Link>

        <Link
          to="/mobile/home"
          className="absolute -top-6 flex flex-col items-center"
        >
          <div className="flex items-center justify-center w-13 h-13 rounded-full bg-white text-[#318134] shadow-lg border-[2px] border-[#318134] ">
            <Home className="h-7 w-7" />
          </div>
          <span className="text-xs text-gray-300 mt-1 dark:text-gray-600">
            Home
          </span>
        </Link>
        <div className="w-8" />

        <Link
          to="/mobile/relations"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <HeartHandshake
            className={`h-6 w-6 ${
              pathname === '/mobile/relations' ||
              pathname === '/mobile/relations-submit' ||
              pathname === '/mobile/relations-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          />
          <span
            className={`text-xs ${
              pathname === '/mobile/relations' ||
              pathname === '/mobile/relations-submit' ||
              pathname === '/mobile/relations-view'
                ? 'text-white'
                : 'text-gray-300'
            }`}
          >
            Relations
          </span>
        </Link>

        <Link
          to="/mobile/profile"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <CircleUserRound
            className={`h-6 w-6 ${
              pathname === '/mobile/profile' ? 'text-white' : 'text-gray-300'
            }`}
          />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
