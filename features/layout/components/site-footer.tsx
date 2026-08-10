'use client';

import Link from 'next/link';
import { toast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/shared/container';
import { SiteLogo } from '@/components/shared/site-logo';
import { footerLinks } from '@/features/layout/data/nav';
import { SITE } from '@/lib/constants';

const socialIcons = [
  { href: SITE.social.linkedin, label: 'LinkedIn', short: 'in' },
  { href: SITE.social.facebook, label: 'Facebook', short: 'f' },
  { href: SITE.social.twitter, label: 'X', short: '𝕏' },
  { href: SITE.social.youtube, label: 'YouTube', short: '▶' },
  { href: SITE.social.instagram, label: 'Instagram', short: 'ig' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div>
      <h3 className='mb-4 text-sm font-semibold text-white'>{title}</h3>
      <ul className='space-y-2.5'>
        {links.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className='text-sm text-white/65 transition-colors hover:text-white'
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className='bg-brand-navy text-brand-navy-foreground'>
      <Container className='py-14'>
        <div className='grid gap-10 lg:grid-cols-12'>
          <div className='lg:col-span-3'>
            <SiteLogo light />
            <p className='mt-4 max-w-sm text-sm text-white/65'>
              {SITE.description} Partner with us to engineer digital success.
            </p>
            <div className='mt-5 flex flex-wrap gap-2'>
              {socialIcons.map(({ href, label, short }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={label}
                  className='flex size-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white'
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 lg:col-span-6'>
            <FooterColumn title='Services' links={footerLinks.services} />
            <FooterColumn title='Solutions' links={footerLinks.solutions} />
            <FooterColumn title='Industries' links={footerLinks.industries} />
            <FooterColumn title='Company' links={footerLinks.company} />
            <FooterColumn title='Resources' links={footerLinks.resources} />
          </div>

          <div className='lg:col-span-3'>
            <h3 className='mb-2 text-sm font-semibold text-white'>Subscribe to Our Newsletter</h3>
            <p className='mb-3 text-sm text-white/65'>
              Get insights, product updates, and engineering tips.
            </p>
            <form
              className='flex flex-col gap-2 sm:flex-row'
              onSubmit={(e) => {
                e.preventDefault();
                toast.success({ title: 'Thanks for subscribing!' });
                (e.target as HTMLFormElement).reset();
              }}
            >
              <Input
                type='email'
                required
                placeholder='Enter your email'
                className='border-white/20 bg-white/5 text-white placeholder:text-white/45'
              />
              <Button type='submit' className='shrink-0'>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className='my-8 bg-white/10' />

        <div className='flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {new Date().getFullYear()} {SITE.name} Co., Ltd. All Rights Reserved.
          </p>
          <div className='flex flex-wrap gap-x-4 gap-y-2'>
            <Link href='/contact' className='hover:text-white'>
              Privacy Policy
            </Link>
            <span className='hidden text-white/30 sm:inline'>|</span>
            <Link href='/contact' className='hover:text-white'>
              Terms of Service
            </Link>
            <span className='hidden text-white/30 sm:inline'>|</span>
            <Link href='/' className='hover:text-white'>
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
