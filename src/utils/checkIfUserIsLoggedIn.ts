import removeAllScreensAndPush from './resetStack';
import loginService from '../services/loginService';

const checkIfLogin = async (navigation: any): Promise<string | null> => {
  const s = await loginService.getAuthToken();
  if (s !== null) {
    removeAllScreensAndPush(navigation, 'HomeScreen');
  } else {
    removeAllScreensAndPush(navigation, 'Login');
  }
  return s;
};

export default checkIfLogin;
