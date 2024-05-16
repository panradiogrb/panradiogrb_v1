// __mocks__/next/router.js

import { Component } from "react";

// Mocked Next.js Router
const useRouter = jest.fn().mockReturnValue({
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  isFallback: false,
});

const withRouter = jest.fn((component: Component) => {


  // Mock router-related props passed by withRouter
  const routerProps = {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    isFallback: false,
  }


  // Render the component with router props
  return component;
});

module.exports = {
  ...jest.requireActual('next/router'), // Use the actual Next.js router for other functions
  useRouter,
  withRouter
};
