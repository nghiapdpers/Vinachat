import {useSelector} from 'react-redux';

export default function useNetworkErr() {
  const networkErrLoading = useSelector((s: any) => s.error.networkLoading);

  return networkErrLoading;
}
