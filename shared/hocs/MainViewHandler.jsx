import { isEqual } from 'lodash';

function MainViewHandlerHOC(options = {}) {
  return function HOC(WrappedComponent) {
    return class extends React.Component {
      static async getInitialProps(ctx) {
        const { query, store, isServer } = ctx;
        const pageProps = WrappedComponent.getInitialProps
          ? await WrappedComponent.getInitialProps(ctx)
          : {};

        const prevQuery = isServer ? {} : window.__NEXT_DATA__.query;
        const hasQueryChanged = !isEqual(query, prevQuery);

        if (hasQueryChanged && !isServer) {
          window.__NEXT_DATA__.query = query;
        }

        if (hasQueryChanged) {
          // wykonaj request
        }

        return { ...pageProps };
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

export default MainViewHandlerHOC;
