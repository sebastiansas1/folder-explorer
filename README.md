# Folder Explorer

Given an arbitrary list of strings (paths), which represent a (directory/file) tree structure separated by a forward slash, present that same tree
using react components. The tree structure should be expandable/collapsible.

## Requirements

- Input list is an array of strings. Those strings have a forward slash as separator to indicate the depth of the tree.
- Use react components and typescript to construct a solution. We usually do not shy away from existing component libraries, but for the purpose of this exercise: please build your own components.
- Use styled components to style your solution to your own preference.
- Think about what is required to make this a production ready solution. There is no need to implement in full detail the actual production ready requirements, but ensure at least the scaffolding is there.
- Do not spend more than 1 working day on this solution.

## Features

- Convert paths into a navigable tree structure
- Interactive UI with expand/collapse capabilities
- Fully accessible using the keyboard (focus, navigation, etc.)
- Supports dark mode
- Built with React and TypeScript using Vite
- Unit tests written with Vite's testing framework (vitest)

## Installation

Make sure you have [pnpm](https://pnpm.io/) installed. Then, install the project dependencies:

```bash
pnpm install
```

## Running the project

```bash
pnpm run dev
```

## Running the unit tests

```bash
pnpm run test
```

## Input data

The data is stored in `src/data.ts`. It contains a list of example paths that can be used to test the application. Please modify this file to test the application with different data.

## Accessibility

A few considerations were made to ensure the application is fully accessible:

- Semantic HTML elements were used for the tree nodes, e.g. `<li>` instead of a generic `<div>`.
- Some aria attributes were added to the tree nodes to improve the experience for users of assistive technologies. E.g. `aria-expanded` is true when the node is expanded, `aria-level` indicates the depth of the node, `aria-label` is set to the node's name.

## Performance

- The state of the tree is handled within the Context API.
- Tree nodes and selection states are stored in two separate contexts to limit the number of re-renders: `TreeContext` and `SelectionContext`.
- The application is optimized for performance by using the `useTreeItemProps` hook to memoize the props of the tree nodes.
- To limit the number of items rendered on the DOM, we only render the visible nodes (i.e. the ones that are currently part of an expanded tree branch).
- In order to simplify working with a data structure such as a tree, we flatten it into an array. This enables us to use array methods to navigate the tree more efficiently and easily. To optimize the performance, we use the `useMemo` hook to store a map of the nodes by their id. This also reduces the lookup time when we need to access a node by its id.
- We use `React.memo` to prevent unnecessary re-renders of the tree nodes.

## Production readiness

In order to make the application more production ready, the following improvements could be made:

- Handle very large and deep trees more efficiently. Implement virtualization. E.g use [react-window](https://github.com/bvaughn/react-window), [react-vtree](https://github.com/Lodin/react-vtree) which is based on `react-window` or [Tanstack Virtual](https://github.com/tanstack/react-virtual).
- Utilize React Error Boundaries to handle and localize errors in the application.
- Write E2E tests. E.g using [Playwright](https://playwright.dev/). Handle critical user flows (e.g. expand/collapse folders in the tree, keyboard navigation, etc.).
- Utilize monitoring tools like Sentry to track errors and monitor performance.
- During the build process, consider minifying and uglifying to improve load times. Consider critical CSS and code splitting.
- Consider documenting the component API. E.g using [Storybook](https://storybook.js.org/). This is particularly useful if the application (components) is consumed as a library or by other services.
- Run performance/accessibility tests via tools like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) or similar.
- Audit dependencies for security vulnerabilities using `pnpm audit` or similar.
- Build pipeline with linting, formatting, type checking, testing, and bundling.
- CI/CD pipeline setup with Github Actions or similar.
- If the application doesn't need a backend, consider bundling into a static site and serve it via a CDN (Edge locations).
- If the application ships with a backend, consider containerizing (Docker) it. This will simplify scalability and deployment to different container services (e.g. AWS Fargate).
