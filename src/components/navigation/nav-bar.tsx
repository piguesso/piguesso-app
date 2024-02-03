import NavLink from "./nav-link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

export default function DynamicIsland() {
  return (
    <div
      className={
        "w-full h-20 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-none sm:rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
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
      <ul className="flex flex-row w-full h-full justify-evenly items-center">
        <li className="px-4 text-center selection:border-1 border-primary w-1/3 transform-gpu">
          <NavLink href={"/play"} lable={"Play"}>
            <PlayArrowOutlinedIcon />
          </NavLink>
        </li>
        <li className="px-4 text-center w-1/3">
          <NavLink href={"/browse"} lable={"Browse"}>
            <SearchOutlinedIcon />
          </NavLink>
        </li>
        <li className="px-4 text-center w-1/3">
          <NavLink href={"/user"} lable={"Profile"}>
            <LoginOutlinedIcon />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
