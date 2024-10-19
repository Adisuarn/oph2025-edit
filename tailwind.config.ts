import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        roboto: ["Roboto",],
        sansThai: ["Noto Sans Thai"],
        Thai:['Noto Sans Thai'],
        inter: ['Inter'],
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      colors: {
        'grumpyGreen': {
          100: '#85AF97',
          300: '#5E8C7B',
          500: '#39675D',
          700: '#21443E'
        },
        'oldyGoldy': '#E5A827',
        'cream': '#F7EFC2',
        'redWine': '#A72305'
      },
    },
  },
  plugins: [],
} satisfies Config;
