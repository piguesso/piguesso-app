const TextStyles = {
  H1: "font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tighter dark:text-white text-black tracking-tight",
  H1Gradient:
    "font-inter font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H2: "font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tighter dark:text-white text-black tracking-tight",
  H2Gradient:
    "font-inter font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H3: "font-inter font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tighter dark:text-white text-black tracking-tight",
  H3Gradient:
    "font-inter font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tighter text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200",
  H4: "font-inter font-black text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl leading-tighter dark:text-white text-bold tracking-tight",
  Highlighted: "font-inter text-sm dark:text-white text-black",
  SmallText: "font-inter text-[0.875rem] text-darkgrey dark:text-grey",
  Text: "font-inter text-base sm:text-[0.875rem] text-black dark:text-white",
  BigText:
    "font-inter text-md md:text-xl text-black dark:text-white leading-tighter",
  Elevated:
    "font-inter text-md md:text-xl text-black dark:text-grey text-darkgrey leading-tighter",
  BigTag: "font-inter text-[0.9375rem] dark:text-white text-black",
  Tag: "font-inter text-xs text-darkgrey dark:text-grey",
  LinkText:
    "font-inter text-[1.0625rem] text-darkgrey dark:text-grey hover:text-secondary",
  BigHint: "font-inter text-[1.0625rem]  text-darkgrey dark:text-grey",
  Hint: "font-inter text-[0.9375rem] text-darkgrey dark:text-grey",
  CursiveHint:
    "font-playfare text-sm sm:text-[1.0625rem] text-darkgrey dark:text-grey",
} as const;

export default TextStyles;
