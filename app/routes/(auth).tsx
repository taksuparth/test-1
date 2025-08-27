import { authCheckLoader } from '~/utils/authCheckLoader';
import { Outlet } from 'react-router';

export { authCheckLoader as Loader };

export default function BaseAuthRoute() {
  return <Outlet />;
}
