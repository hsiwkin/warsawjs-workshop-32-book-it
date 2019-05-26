export default function promiseMiddleware(store) {
  return next => action => {
    if (typeof action === 'function') {
      return action(next, store);
    }

    const { promise, type, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const SUCCESS = `${type}_SUCCESS`;
    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        if (res.errors) {
          return Promise.reject(res.errors);
        }

        next({ ...rest, res, type: SUCCESS });

        return Promise.resolve();
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });
        return Promise.reject();
      });
  };
}
