import { SiteHeader } from '@/features/layout/components/site-header';
import { getMainNavItems, getMobileNavItems } from '@/features/layout/lib/get-public-nav';

export async function SiteHeaderServer() {
  const [mainItems, mobileItems] = await Promise.all([getMainNavItems(), getMobileNavItems()]);

  return <SiteHeader mainItems={mainItems} mobileItems={mobileItems} />;
}
