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
        sans: ["Noto Sans Thai"],
        roboto: ["Roboto",],
        Thai: ["Noto Sans Thai"],
        inter: ['Inter'],
        BaiJamjuree: ['Bai Jamjuree'],
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
        'redWine': '#A72305',
        'greenText': '#0C453E',
        'buttonMiddle': '#15786C',
        'buttonFirst': '#ADDB64',
        'heroFirst': '#ADDB64',
        'heroMiddle': '#15786C',
        'gray': '#D9D9D9',
        'formText': '#141547',
        'greenishCream': '#ECF5C8',
        'landingGreen': 'ADDB64'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(101deg, #0C453E -1.64%, #15786C 55.02%, #ADDB64 128.53%)',
        'custom-gradient-inverse': 'linear-gradient(101deg, #ADDB64 -1.64%, #15786C 55.02%, #0C453E 128.53%)',
      },
      transitionProperty: {
        'width': 'width',
        'spacnig': 'margin, padding',
        'transform': 'transform',
      },
      animation: {
        'fade-in': 'fade 0.5s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;

