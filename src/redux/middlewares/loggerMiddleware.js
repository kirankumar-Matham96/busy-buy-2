export const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log(`[LOG]: Timestamp: ${new Date().toISOString()}`);
      console.log(`[LOG]: Dispatching action: ${action.type}`);
      next(action);
    };
  };
};
