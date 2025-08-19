import { checkAuthentication } from '~/utils/checkAuthentication';
import { Outlet, type LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await checkAuthentication({ request });
  return { user };
}

export default function BaseAuthRoute() {
  return <Outlet />;
}
