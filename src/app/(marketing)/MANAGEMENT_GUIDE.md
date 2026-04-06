# Marketing Pages Organization

This document explains how the marketing pages are organized and how to maintain them.

## Project Structure

```
src/app/(marketing)/
├── about/              # Company information page
├── blog/               # Blog and insights
├── careers/            # Job opportunities
├── case-studies/       # Customer success stories
├── contact/            # Contact form page
├── faq/                # Frequently asked questions
├── portfolio/          # Company work showcase
├── pricing/            # Pricing information
├── products/           # Product offerings
│   ├── crm-platform/
│   ├── erp-platform/
│   └── hr-system/
├── services/           # Service offerings
│   ├── web-development/
│   ├── mobile-app-development/
│   ├── erp-systems/
│   ├── crm-systems/
│   ├── ai-solutions/
│   └── cloud-devops/
└── solutions/          # Industry solutions
    ├── fintech/
    ├── healthcare/
    ├── logistics/
    ├── education/
    └── ecommerce/
```

## How Pages Work

### 1. **Main Pages** (using SiteShell wrapper)
- `services/page.tsx`
- `solutions/page.tsx`
- `products/page.tsx`

These pages display grid layouts of items and link to detail pages.

### 2. **Detail Pages** (using DetailPage component)
All other pages in marketing use the `DetailPage` component which automatically provides:
- Page hero section with eyebrow, title, description
- Highlight panel with key points
- Capabilities and outcomes sections
- Related pages links
- CTA banner at bottom

### 3. **Data Structure** (in src/lib/site-data.tsx)
Pages get their content from these data exports:
- `genericMarketingPages` - About, Blog, Careers, Case Studies, Contact, FAQ, Portfolio, Pricing, Process
- `serviceDetails` - Service detail pages
- `solutionDetails` - Solution detail pages
- `productDetails` - Product detail pages

## Adding New Pages

### To Add a New Generic Marketing Page:

1. **Create the page folder:**
   ```
   src/app/(marketing)/my-page/page.tsx
   ```

2. **Add page data to `site-data.tsx`:**
   ```typescript
   export const genericMarketingPages: Record<string, DetailPage> = {
     // ... existing pages
     "my-page": {
       eyebrow: "Category",
       title: "My Page Title",
       description: "Page description...",
       highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
       capabilities: ["Capability 1", "Capability 2"],
       outcomes: ["Outcome 1", "Outcome 2"],
       relatedLinks: [
         { label: "Related Page", href: "/related-page" }
       ],
     }
   };
   ```

3. **Create the page component:**
   ```typescript
   import { DetailPage } from "@/components/layout/detail-page";
   import { genericMarketingPages } from "@/lib/site-data";

   const page = genericMarketingPages["my-page"];

   export default function MyPage() {
     return (
       <DetailPage
         activeHref="/my-page"
         eyebrow={page.eyebrow}
         title={page.title}
         description={page.description}
         highlights={page.highlights}
         capabilities={page.capabilities}
         outcomes={page.outcomes}
         relatedLinks={page.relatedLinks}
       />
     );
   }
   ```

### To Add a New Service Page:

Follow the same pattern using `serviceDetails` and the [ServiceName] naming convention.

## Navigation Management

All navigation is centralized in `site-data.tsx`:

- **mainNav** - Top navigation links
- **marketingNavGroups** - Marketing footer navigation
- **platformNavGroups** - Platform footer navigation

Update these arrays to change what appears in the site header and footer.

## Related Links Strategy

Each detail page includes a "Keep Exploring" section with related pages. These are defined in the `site-data.tsx`:

```typescript
const marketingRelated = {
  about: [{ label: "Services", href: "/services" }, ...],
  // ... more mappings
};
```

**This ensures users can navigate through the content naturally** instead of feeling stuck on isolated pages.

## Component Hierarchy

```
SiteShell (header + footer + content wrapper)
└── DetailPage (page structure + related links)
    └── PageHero (title section)
    └── HighlightPanel (key points)
    └── Capabilities section
    └── Outcomes section
    └── Related pages grid
    └── CtaBanner (call to action)
```

## Best Practices

1. **Keep data separate from components** - All content lives in `site-data.tsx`
2. **Consistent naming** - Use kebab-case for slugs, TitleCase for display names
3. **Link strategically** - Each page should link to 3-4 related pages
4. **All pages must pass all props** - Ensure `capabilities`, `outcomes`, and `relatedLinks` are always provided
5. **Maintain the marketing group** - All (marketing) pages stay in this folder for clean routing

## Testing

All pages automatically render with:
- ✅ Proper styling and layout
- ✅ Working navigation and links
- ✅ SEO metadata from parent layout
- ✅ Responsive design

No additional testing needed per-page since components are reusable.

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Page shows incomplete content | Check all required props passed to DetailPage |
| Missing navigation | Verify page key exists in navigation arrays in site-data.tsx |
| Links not working | Ensure href in relatedLinks matches actual page path |
| Styling issues | DetailPage handles all styling - use provided props only |

---

**Last Updated:** April 2, 2026
