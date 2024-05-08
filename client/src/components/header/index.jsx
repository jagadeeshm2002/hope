import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
  UserIcon,
  TruckIcon,
  CreditCardIcon,
  PhoneIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

// profile menu component
const profileMenuUser = [
  {
    label: "Dashboard",
  },
  {
    label: "Sign Out",
  },
];

const ProfileMenuGuest = [{ label: "Login" }, { label: "Sign Out" }];

function ProfileMenu() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authenticated = useSelector(selectIsAuthenticated);
  const closeMenu = () => setIsMenuOpen(false);

  const signOut = () => {
    dispatch(logOut());

    window.location.reload();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-5"
        >
          <UserIcon className="h-8 w-8 border border-gray-900 p-0.5 rounded-3xl" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 !min-w-[150px]">
        {authenticated === true ? (
          <>
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded !p-0`}
              type="button"
              
              
            >
              <Link to={"dashboard"} className=" w-full px-3 py-2">
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                  
                >
                  Dashboard
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded !p-0 hover:bg-red-50 active:bg-red-100`}
            >
              <button
              className="  w-full px-3 py-2"
                onClick={(e) => {
                  e.preventDefault()
                  signOut();
                }}
              >
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal text-red-700"
                  
                  
                >
                  Sign Out
                </Typography>
              </button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded !p-0`}
              type="button"
              
              
            >
              <Link to={"login"} className=" w-full px-3 py-2">
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  
                  
                >
                  Login
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded !p-0`}
              type="button"
              
              
            >
              <Link to={"Register"} className=" w-full px-3 py-2">
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                  
                >
                  Register
                </Typography>
              </Link>
            </MenuItem>
            
          </>
        )}
      </MenuList>
    </Menu>
  );
}

// nav list menu

// nav list component
const navListItems = [
  {
    label: "Shop",
  },
  {
    label: "Men",
  },
  {
    label: "Women",
  },
  {
    label: "kids",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const cartItemsCount = 5;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <header className="shadow">
      <div className="bg-gray-900  flex items-center mx-auto justify-center">
        <div className="flex items-center max-w-screen-xl py-1 justify-between text-blue-gray-900 md:gap-32 lg:gap-48 xl:gap-72 transition-all ">
          <span className="hidden md:flex items-center text-gray-100 ">
            <TruckIcon className="h-4 w-4 mr-1" color="white" /> free Shipping
          </span>
          <span className="hidden md:flex items-center text-gray-100">
            <CreditCardIcon className="h-4 w-4 mr-1" color="white" /> Payment
            Methods
          </span>
          <span className="hidden md:flex items-center text-gray-100">
            <PhoneIcon className="h-4 w-4 mr-1" color="white" /> Call us
            951-999-9999
          </span>
          <span className="flex md:hidden items-center text-gray-100">
            <PhoneIcon className="h-4 w-4 mr-1" color="white" /> Need advice?
            Call us 951-999-9999
          </span>
        </div>
      </div>
      <Navbar className="mx-auto max-w-screen-xl p-2 shadow-none lg:pl-6">
        <div className="relative mx-0 md:mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 md:mr-auto cursor-pointer py-1.5 font-medium"
          >
            HOPE
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="min-w-[100px] max-w-32 md:max-w-[250px] mx-0 md:mx-auto ">
            <div className="w-36 ">
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="w-40 md:w-full flex items-center !border !border-gray-300 focus:border-solid-gray-500 focus:border-t-gray-800  bg-blue-gray-50 px-3 py-1.5 text-sm  text-blue-gray-800 placeholder-blue-gray-500 shadow-none outline-none focus:shadow-none active:border-none"
                labelProps={{
                  className: "hidden",
                }}
                icon={
                  <MagnifyingGlassIcon className="h-5 w-5 hidden md:block focus:outline-none  focus:shadow-none placeholder-shown:border-t-0" />
                }
              />
            </div>
          </div>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <div className="flex items-center">
            <div className="  relative">
              <ShoppingBagIcon className="h-6 w-6 relative" />
              {cartItemsCount > 0 && (
                <span className="absolute top-[-10px] right-[-8px] mt-1 mr-1 flex border-gray-100 border items-center justify-center rounded-full bg-red-600 w-4 h-4 text-white text-xs font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </div>

            <ProfileMenu />
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar>
    </header>
  );
}
