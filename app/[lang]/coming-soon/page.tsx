import ComingSoonClient from './ComingSoonClient';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default function Page() {
  return <ComingSoonClient />;
}
