import {useSelector} from 'react-redux';

export default function useLogin() {
  const login = useSelector((s: any) => s.user.login.status);

  return login;
}
