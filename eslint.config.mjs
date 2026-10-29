// Revisión de calidad del código: reglas de Next.js, React, accesibilidad (jsx-a11y) y TypeScript.
// Uso: npm run lint
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Variables sin usar = código muerto (se permiten si empiezan con "_")
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  { ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts", "drizzle/**"] },
];

export default config;
