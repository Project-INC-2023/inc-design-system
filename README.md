# inc-design-system

## How to install

1. Install the package

    `npm install inc-design-system`

2. Add the plugin to your _tailwind.config.ts_

    `plugins: [require("inc-design-system")],`

3. Add the package location to the contents in your _tailwind.config.ts_

    `content: ["./node_modules/inc-design-system/dist/**/*.{js,ts,jsx,tsx}"]`

4. Import the component in your application

    `import { Alert } from "inc-design-system/alert"`
