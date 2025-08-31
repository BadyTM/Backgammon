import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";

configureVueProject({ scriptLangs: ["ts"] });

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "eslint.config.*"]),

  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },
  skipFormatting,
);
