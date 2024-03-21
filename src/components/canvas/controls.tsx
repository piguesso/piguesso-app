import { twMerge } from "tailwind-merge";
import ColorControls from "@/components/navigation/color-controls";
import { Navbar } from "@/components/navigation/nav-bar";

interface ControlsProps {
  switchControls: any;
  controls: boolean;
  setColor: any;
  handleClear: any;
  getFirstWord?: any;
  currentWord: string;
  UserImageUrl: string;
  UserTag: string;
}

const Controls = ({
  switchControls,
  controls,
  setColor,
  handleClear,
  getFirstWord,
  currentWord,
  UserImageUrl,
  UserTag,
}: ControlsProps) => {
  return (
    <div
      className={
        "w-[90%] h-20 sm:w-fit bg-surface absolute sm:absolute bottom-10 sm:bottom-10 mx-auto left-0 right-0 rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
      }
    >
      <div className="max-w-fit h-full flex items-center">
        <div
          className={twMerge(
            "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-md flex items-center justify-center cursor-pointer",
          )}
          onClick={switchControls}
        >
          <i className="fa-solid fa-repeat"></i>
        </div>
        <div className="h-[80%] w-[1px] bg-gray-500 my-auto mx-2" />
        {controls ? (
          <ColorControls
            setColor={setColor}
            clear={handleClear}
            generateNewWord={getFirstWord}
            currentWord={currentWord}
          />
        ) : (
          <>
            <Navbar UserImageUrl={UserImageUrl} UserTag={UserTag} />
            <div className="h-[80%] w-[1px] bg-gray-500 my-auto mx-2" />
          </>
        )}
      </div>
    </div>
  );
};

export { Controls };
