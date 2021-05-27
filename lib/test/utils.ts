export const findByTestAttr = (wrapper, testId) => {
    return wrapper.find(`[data-test="${testId}"]`);
}