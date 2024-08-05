# inc-design-system

## 1.5.8

### Patch Changes

- **Enhancements:**

  - **DatePicker & RangeDatePicker:**
    - Added `useEffect` hooks to ensure the components react to external changes in the selected date state.
  - **Calendar Component:**
    - Updated the hover effect color for the "Today" button for better UI consistency.

  **Bug Fixes:**

  - **Input Component:**
    - Corrected the logic for displaying the visibility icon in the Input component. The icon now correctly reflects the `show` state.
    - Added a missing `containerClassName` prop to allow modification of the parent `div` when using input type `password`.

## 1.5.7

### Patch Changes

- feat: add disabledDays, dropDownClassName and calendarClassName props to DatePicker

  fix: replace div with span in AlertModalTitle and ModalTitle to Avoid HTML Nesting Warning

## 1.5.6

### Patch Changes

- feat: update build config

## 1.5.5

### Patch Changes

- Fix: Fixed various issues to improve stability and performance for Toast component
- Feat: Added animations to enhance user experience for Input and Textarea components
- Style: Ensured consistent styling between Input and Textarea components for a unified look and feel.

## 1.5.4

### Patch Changes

- fix: modal component forwardref without ref

## 1.5.3

### Patch Changes

- Fixed build issues

## 1.5.2

### Patch Changes

- Updated Card component to use forwardRef for improved performance.
- Split ScrollableList component into different orientations.
- Added isLoading prop to Button component.
- Fixed animation issues across various components.

## 1.5.1

### Patch Changes

- feat: Add overlayClassName prop to AlertModalContent and ModalContent components

## 1.5.0

### Minor Changes

- feat: Introduce Progress Component and Update Sheet and Textarea Components

  - Added new Progress component to enhance UI feedback on task completion.
  - Implemented minor updates to Sheet and Textarea components for improved user experience.

## 1.4.1

### Patch Changes

- style: change MultiSelect dropdown background colour
- refactor: change Modal and AlertModal components usage. Added ModalTitle and AlertModalTitle components for better user experience and customisability with the Modal and AlertModal components

## 1.4.0

### Minor Changes

- feat: add Sheet component and its sub-components. This includes Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose and SheetContent

## 1.3.0

### Minor Changes

- feat: add Toast component

## 1.2.4

### Patch Changes

- fix: remove unused headers prop for accordion component which caused typescript error

## 1.2.3

### Patch Changes

- feat: export all Accordion related sub-components. This includes Accordion, AccordionContent, AccordionItem and AccordionTrigger.

## 1.2.2

### Patch Changes

- feat: Usage of Accodion has changed such that each item needs to be enclosed by an accordionItem. Now, users do not need to pass in any headers props etc. Accordian children will be displayed using AccordianItem.

## 1.2.1

### Patch Changes

- style: update TableHead component height and padding. Original height and padding for TableHead was too much, making it look less appealing. Change height from 48px to 10px. Change padding from 16px for each horizontal side to 8px for each horizontal side

## 1.2.0

### Minor Changes

- feat: add Table components and its sub-components to the INC Design System Component Library. This includes Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell and TableCaption

## 1.1.0

### Minor Changes

- add Avatar component and correct the issue where drag and drop did not work for the FileUpload component

## 1.0.4

### Patch Changes

- fix: correct TimePicker folder and file names to match export path to fix "Module not found: Can't resolve 'inc-design-system/timePicker'" build error

## 1.0.3

### Patch Changes

- correct typo in file paths for Modal component in package.json to fix "Module not found: Can't resolve 'inc-design-system/modal'" build error

## 1.0.2

### Patch Changes

- move all of Modal exports to last line below to fix "Module not found: Can't resolve 'inc-design-system/modal'" build error

## 1.0.0

### Major Changes

- INC DESIGN SYSTEM RELEASE!!!
