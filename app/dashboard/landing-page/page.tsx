import { redirect } from 'next/navigation';

export default function LandingPageRedirect() {
  redirect('/dashboard/pages?page=home');
}
