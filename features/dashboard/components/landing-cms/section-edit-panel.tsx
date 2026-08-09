'use client';

import { LayoutTemplate } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { CaseStudiesEditor } from '@/features/dashboard/components/landing-cms/editors/case-studies-editor';
import { ContactCtaEditor } from '@/features/dashboard/components/landing-cms/editors/contact-cta-editor';
import { HeroEditor } from '@/features/dashboard/components/landing-cms/editors/hero-editor';
import { IndustriesEditor } from '@/features/dashboard/components/landing-cms/editors/industries-editor';
import { ServicesEditor } from '@/features/dashboard/components/landing-cms/editors/services-editor';
import { TestimonialsEditor } from '@/features/dashboard/components/landing-cms/editors/testimonials-editor';
import { TrustedByEditor } from '@/features/dashboard/components/landing-cms/editors/trusted-by-editor';
import { WhyChooseEditor } from '@/features/dashboard/components/landing-cms/editors/why-choose-editor';
import type {
  LandingContent,
  LandingSectionMeta,
  SectionId,
} from '@/features/dashboard/data/landing-cms';

export function SectionEditPanel({
  section,
  content,
  onContentChange,
  onMetaChange,
}: {
  section: LandingSectionMeta;
  content: LandingContent;
  onContentChange: <K extends SectionId>(id: K, next: LandingContent[K]) => void;
  onMetaChange: (patch: Partial<LandingSectionMeta>) => void;
}) {
  return (
    <Card className='border-border/80 shadow-sm'>
      <CardHeader className='flex flex-row items-start justify-between gap-2 space-y-0 pb-3'>
        <div className='flex items-center gap-2'>
          <span className='flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
            <LayoutTemplate className='size-4' />
          </span>
          <div>
            <div className='flex flex-wrap items-center gap-2'>
              <CardTitle className='text-base font-bold'>{section.title}</CardTitle>
              <Badge
                variant='secondary'
                className={
                  section.status === 'Published'
                    ? 'border-0 bg-emerald-500/15 text-emerald-700'
                    : 'border-0'
                }
              >
                {section.status}
              </Badge>
            </div>
            <p className='text-xs text-muted-foreground'>ID: {section.id}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='content'>
          <TabsList className='mb-4 w-full justify-start'>
            <TabsTrigger value='content'>Content</TabsTrigger>
            <TabsTrigger value='seo'>SEO</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='visibility'>Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value='content'>
            {section.id === 'hero' ? (
              <HeroEditor value={content.hero} onChange={(next) => onContentChange('hero', next)} />
            ) : null}
            {section.id === 'trustedBy' ? (
              <TrustedByEditor
                value={content.trustedBy}
                onChange={(next) => onContentChange('trustedBy', next)}
              />
            ) : null}
            {section.id === 'services' ? (
              <ServicesEditor
                value={content.services}
                onChange={(next) => onContentChange('services', next)}
              />
            ) : null}
            {section.id === 'industries' ? (
              <IndustriesEditor
                value={content.industries}
                onChange={(next) => onContentChange('industries', next)}
              />
            ) : null}
            {section.id === 'whyChoose' ? (
              <WhyChooseEditor
                value={content.whyChoose}
                onChange={(next) => onContentChange('whyChoose', next)}
              />
            ) : null}
            {section.id === 'caseStudies' ? (
              <CaseStudiesEditor
                value={content.caseStudies}
                onChange={(next) => onContentChange('caseStudies', next)}
              />
            ) : null}
            {section.id === 'testimonials' ? (
              <TestimonialsEditor
                value={content.testimonials}
                onChange={(next) => onContentChange('testimonials', next)}
              />
            ) : null}
            {section.id === 'contactCta' ? (
              <ContactCtaEditor
                value={content.contactCta}
                onChange={(next) => onContentChange('contactCta', next)}
              />
            ) : null}
          </TabsContent>

          <TabsContent value='seo' className='space-y-4'>
            <div className='space-y-1.5'>
              <Label>SEO Title</Label>
              <Input
                value={section.seoTitle}
                onChange={(e) => onMetaChange({ seoTitle: e.target.value })}
                placeholder='Optional section SEO title'
              />
            </div>
            <div className='space-y-1.5'>
              <Label>SEO Description</Label>
              <Textarea
                rows={3}
                value={section.seoDescription}
                onChange={(e) => onMetaChange({ seoDescription: e.target.value })}
                placeholder='Optional meta description'
              />
            </div>
          </TabsContent>

          <TabsContent value='settings' className='space-y-4'>
            <div className='space-y-1.5'>
              <Label>Section label</Label>
              <Input
                value={section.title}
                onChange={(e) => onMetaChange({ title: e.target.value })}
              />
            </div>
            <div className='space-y-1.5'>
              <Label>Status</Label>
              <select
                className='flex h-9 w-full rounded-lg border bg-background px-3 text-sm'
                value={section.status}
                onChange={(e) =>
                  onMetaChange({
                    status: e.target.value as LandingSectionMeta['status'],
                  })
                }
              >
                <option value='Published'>Published</option>
                <option value='Draft'>Draft</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value='visibility' className='space-y-3'>
            <label className='flex items-center gap-2 text-sm'>
              <Checkbox
                checked={section.visible}
                onCheckedChange={(checked) => onMetaChange({ visible: checked === true })}
              />
              Visible on landing page
            </label>
            <p className='text-xs text-muted-foreground'>
              Hidden sections stay in the CMS list but are marked off for publish (demo only).
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
