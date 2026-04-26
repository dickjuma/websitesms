# Logo Integration Guide

## Overview

The SMA application now has a reusable `Logo` component that displays the company logo with text and a link to the home page.

## Current Logo Setup

The logo component currently uses a **default SVG icon** with a blue-to-cyan gradient background. This appears in:
- ✅ Site header (all pages)
- ✅ Can be used anywhere in the app

## How to Use the Logo Component

### Basic Usage (with text)

```tsx
import { Logo } from "@/components/logo";

export function MyComponent() {
  return <Logo />;
}
```

### With Size Options

```tsx
// Small logo (for sidebars, compact areas)
<Logo size="sm" />

// Medium logo (default, for headers)
<Logo size="md" />

// Large logo (for hero sections, featured areas)
<Logo size="lg" />
```

### Just the Logo Icon

For places where you need only the icon without text:

```tsx
import { LogoMark } from "@/components/logo";

export function MyComponent() {
  return <LogoMark />;
}
```

## Adding a Custom Logo Image

### Step 1: Add Your Logo File

Place your logo file in one of these directories:
- `public/logos/` - For logo-specific files
- `public/images/` - For general images

Supported formats: `.svg`, `.png`, `.jpg`, `.webp`

**Example:**
```
public/logos/sma-logo.svg
public/logos/sma-logomark.png
```

### Step 2: Update the Logo Component

Edit `src/components/logo.tsx` to use your image:

```tsx
import Image from "next/image";

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeConfig = {
    sm: { containerClass: "h-8 w-8" },
    md: { containerClass: "h-11 w-11" },
    lg: { containerClass: "h-14 w-14" },
  };

  const config = sizeConfig[size];

  return (
    <Link href="/" className={`group flex items-center gap-3 transition-all hover:scale-[1.01] ${className}`}>
      {/* Use your custom logo image */}
      <Image
        src="/logos/sma-logo.svg"
        alt="SMA Systems and Softwares"
        width={44}
        height={44}
        className="rounded-xl"
      />

      {/* Logo Text */}
      <div>
        <p className="text-base font-bold tracking-tight text-slate-950">SMA</p>
        <p className="text-xs text-slate-500">Enterprise Solutions</p>
      </div>
    </Link>
  );
}
```

## Logo Usage Throughout the App

The logo is already integrated in these locations:

1. **Site Header** (`src/components/layout/site-shell.tsx`)
   - Appears on all pages
   - Links back to homepage
   - Uses `<Logo />` component

2. **Chatbot** can use `<LogoMark />` for branding

3. **Available for use** in:
   - Footer (optional)
   - Email signatures
   - PDF exports
   - Dashboard headers

## Styling the Logo

To customize the gradient colors (currently blue-to-cyan):

Edit `src/components/logo.tsx`:

```tsx
{/* Change the gradient colors here */}
<div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[YOUR_COLOR_1] to-[YOUR_COLOR_2] shadow-lg shadow-[your-color]-200 ${config.containerClass}`}>
```

Example color combinations:
- Blue → Cyan: `from-blue-600 to-cyan-500` ✅ (current)
- Purple → Pink: `from-purple-600 to-pink-500`
- Green → Teal: `from-green-600 to-teal-500`
- Indigo → Blue: `from-indigo-600 to-blue-500`

## Size Reference

| Size | Container | Use Case |
|------|-----------|----------|
| `sm` | 32 × 32px | Sidebars, small headers |
| `md` | 44 × 44px | Main header, default |
| `lg` | 56 × 56px | Hero sections, featured areas |

## Example: Custom Logo with Image

```tsx
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 44,
    lg: 56,
  };

  const imageSize = sizes[size];

  return (
    <Link href="/" className={`group flex items-center gap-3 transition-all hover:scale-[1.01] ${className}`}>
      <Image
        src="/logos/sma-logo.png"
        alt="SMA Systems and Softwares"
        width={imageSize}
        height={imageSize}
        className="rounded-xl"
      />

      <div>
        <p className="text-base font-bold tracking-tight text-slate-950">SMA</p>
        <p className="text-xs text-slate-500">Enterprise Solutions</p>
      </div>
    </Link>
  );
}
```

## Best Practices

1. **Use SVG when possible** - Better scaling, smaller file size, cleaner look
2. **Maintain aspect ratio** - Logos should be square or rectangular
3. **Add proper alt text** - Important for accessibility
4. **Test on light backgrounds** - Logo should be visible on white/light backgrounds
5. **Optimize images** - Compress PNGs/JPGs before adding
6. **Version your logo** - Keep different formats (svg, png) for flexibility

## Next Steps

1. ✅ Upload your SMA logo to `public/logos/`
2. ✅ Update `src/components/logo.tsx` with your image path
3. ✅ Update gradient colors if needed
4. ✅ Test on different pages
5. ✅ Verify responsive scaling

---

**Last Updated:** April 2, 2026
