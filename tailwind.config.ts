import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#f1f3ea',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#006a4e',
          foreground: 'hsl(var(--primary-foreground))',
          "50": "#e6f0ed",
      "100": "#b0d1c8",
      "200": "#8abaae",
      "300": "#549b88",
      "400": "#338871",
      "500": "#006a4e",
      "600": "#006047",
      "700": "#004b37",
      "800": "#003a2b",
      "900": "#002d21"
        },
        secondary: {
          DEFAULT: '#f42a41',
          foreground: 'hsl(var(--secondary-foreground))',
          "50": "#feeaec",
      "100": "#fcbdc4",
      "200": "#fa9da8",
      "300": "#f87080",
      "400": "#f65567",
      "500": "#f42a41",
      "600": "#de263b",
      "700": "#ad1e2e",
      "800": "#861724",
      "900": "#66121b"
        },
    baseLight: {
      "50": "#fdfefc",
      "100": "#fafaf7",
      "200": "#f7f8f3",
      "300": "#f4f5ee",
      "400": "#f1f3ea",
      "500": "#eef0e5",
      "600": "#d9dad0",
      "700": "#a9aaa3",
      "800": "#83847e",
      "900": "#646560"
    },
    baseDark: {
      "50": "#e6e7e6",
      "100": "#b1b5b1",
      "200": "#8b928b",
      "300": "#556056",
      "400": "#354135",
      "500": "#021103",
      "600": "#020f03",
      "700": "#010c02",
      "800": "#010902",
      "900": "#010701"
    },
    grey: {
      "50": "#f3f3f3",
      "100": "#d9d9d9",
      "200": "#c7c7c7",
      "300": "#aeaeae",
      "400": "#9e9e9e",
      "500": "#868686",
      "600": "#7a7a7a",
      "700": "#5f5f5f",
      "800": "#4a4a4a",
      "900": "#383838"
    },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [tailwindAnimate],
};
