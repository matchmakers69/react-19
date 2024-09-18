import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => ({
	base: "./",
	plugins: [react()],
	build: {
		outDir: "build",
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
	},
	resolve: {
		alias: {
			"@app": "/src/app",
			"@components": "/src/components",
			"@features": "/src/features",
			"@context": "/src/context",
			"@services": "/src/services",
			"@layouts": "/src/layouts",
			"@pages": "/src/pages",
			"@utils": "/src/utils",
			"@config": "/src/config",
		},
	},
}));
