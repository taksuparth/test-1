export async function loader() {
  throw new Response('Not Found', { status: 404 });
}

export default function Component() {
  // This component will not be rendered directly as the loader throws
  return null;
}
