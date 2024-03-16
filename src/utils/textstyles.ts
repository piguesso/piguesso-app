const TextStyles = {
  H1: "font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tighter dark:text-white text-black tracking-tight",
  H1Gradient:
    "font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H2: "font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl leading-tighter dark:text-white text-black tracking-tight",
  H2Gradient:
    "font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H3: "font-mono font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tighter dark:text-white text-black tracking-tight",
  H3Gradient:
    "font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H4: "font-mono font-black text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl leading-tighter dark:text-white text-bold tracking-tight",
  H5: "font-mono font-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-tighter dark:text-white text-bold tracking-tight",
  H6: "font-mono font-black text-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl leading-tighter dark:text-white text-bold tracking-tight",
  H7: "font-mono font-black text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl leading-tighter dark:text-white text-bold tracking-tight",
  Highlighted: "text-sm dark:text-white text-black",
  SmallText: "text-[0.875rem] text-darkgrey dark:text-grey",
  Text: "text-base sm:text-[0.875rem] text-black dark:text-white",
  BigText: "text-md md:text-xl text-black dark:text-white leading-tighter",
  Elevated:
    "text-md md:text-xl text-black dark:text-grey text-darkgrey leading-tighter",
  BigTag: "text-[0.9375rem] dark:text-white text-black",
  Tag: "text-xs text-darkgrey dark:text-grey",
  LinkText: "font-sans text-sm text-white dark:text-grey hover:text-secondary",
  BigHint: "text-[1.0625rem]  text-darkgrey dark:text-grey",
  Hint: "font-mono text-[0.9375rem] text-darkgrey dark:text-grey",
  RobotoText: "font-roboto text-base sm:text-[0.875rem] text-white dark:text-white",
  RobotoHint: "font-roboto text-[0.9375rem] text-primary dark:text-primary",
  RobotoBigText: "font-roboto text-sm md:text-md text-white dark:text-white leading-tighter",
} as const;

export default TextStyles;
