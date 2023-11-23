const removeAllScreensAndPush = (navigation: any, routeName: string): void => {
  navigation.reset({
    index: 0,
    routes: [{ name: routeName }],
  });
};

export default removeAllScreensAndPush;

// Usage example
// removeAllScreensAndPush(this.props.navigation, 'NewScreen');
