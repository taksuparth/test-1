import PageLayout from '~/components/layout/PageLayout';
import { checkAuthentication } from '~/utils/checkAuthentication';
import { Outlet, type LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await checkAuthentication({ request });
  return { user };
}

export default function AuthAdminLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
