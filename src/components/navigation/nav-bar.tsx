import NavLink from "./nav-link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function DynamicIsland() {
  return (
    <div
      className={
        "h-20 min-w-10 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-none sm:rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
      }
    >
      <div className="max-w-fit h-full flex">
        <Navbar />
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <div className="h-full">
      <ul className="flex w-full h-full justify-evenly items-center">
        <li className="mx-4 text-center selection:border-1 border-primary min-w-[50px] w-1/3">
          <NavLink href={"/play"} lable={"Play"}>
            <PlayArrowOutlinedIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center w-1/3 min-w-[50px]">
          <NavLink href={"/browse"} lable={"Browse"}>
            <SearchOutlinedIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center w-1/3 min-w-[50px] flex">
          <NavLink href={""} lable={"Profile"}>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton afterSignUpUrl="/join">
                <LoginOutlinedIcon className="mx-auto" />
              </SignInButton>
            </SignedOut>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
