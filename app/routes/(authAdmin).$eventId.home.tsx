import { ViewLayout } from '~/components/layout/ViewLayout.tsx';

export default function Home() {
  return (
    <ViewLayout>
      <ViewLayout.Header>
        <ViewLayout.Header.Title>Home</ViewLayout.Header.Title>
      </ViewLayout.Header>
      <ViewLayout.Body>
        <div>Home page body</div>
      </ViewLayout.Body>
    </ViewLayout>
  );
}
