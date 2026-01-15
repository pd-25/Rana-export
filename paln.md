## Folder Structure

```
global-s-p/
├── app/                              # Next.js App Router (SSR pages)
│   ├── layout.tsx                    # Root layout (html, body, providers)
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles, CSS variables
│   │
│   ├── our-story/
│   │   └── page.tsx                  # About Us page (SSR)
|   |
│   ├── our-collection/
│   │   └── page.tsx   
│   ├── contact/
│   │   └── page.tsx                  # Contact Us page (SSR)
│   │
│   ├── products-services/
│   │   ├── page.tsx                  # Product listing page (SSR)
│   │   └── [categoryId]/
│   │       ├── page.tsx              # Category page (SSR)
│   │       └── [productId]/
│   │           └── page.tsx          # Product detail page (SSR)
│   │
│   └── api/                          # API routes (if needed for BFF pattern)
│       └── leads/
│           └── route.ts              # Lead form submission handler
│
├── components/                       # Reusable UI components
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   │   ├── Navbar.tsx
│   │    └── Navbar.module.css
│   │
│   ├── ui/                           # Generic UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.module.css
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.module.css
│   │   └── Modal/
│   │       ├── Modal.tsx
│   │       └── Modal.module.css
│   │
│   ├── sections/                     # Page sections (reusable blocks)
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── Banner/
│   │   │   ├── Banner.tsx
│   │   │   └── Banner.module.css
│   │   ├── Testimonials/
│   │   │   ├── Testimonials.tsx
│   │   │   └── Testimonials.module.css
│   │   ├── ProductGrid/
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductGrid.module.css
│   │   └── CategoryList/
│   │       ├── CategoryList.tsx
│   │       └── CategoryList.module.css
│   │
│   └── forms/                        # Lead generation forms
│       ├── ContactForm/
│       │   ├── ContactForm.tsx
│       │   └── ContactForm.module.css
│       ├── QuoteForm/
│       │   ├── QuoteForm.tsx
│       │   └── QuoteForm.module.css
│       └── NewsletterForm/
│           ├── NewsletterForm.tsx
│           └── NewsletterForm.module.css
│
├── lib/                              # Utility functions & configurations
│   ├── api.ts                        # FastAPI client/fetch wrapper
│   ├── constants.ts                  # App constants
│   └── utils.ts                      # Helper functions
│
├── types/                            # TypeScript type definitions
│   ├── product.ts                    # Product & Category types
│   ├── testimonial.ts                # Testimonial types
│   ├── lead.ts                       # Lead form types
│   └── api.ts                        # API response types
│
├── hooks/                            # Custom React hooks
│   ├── useForm.ts                    # Form handling hook
│   └── useFetch.ts                   # Data fetching hook (client-side)
│
├── styles/                           # Shared CSS utilities
│   ├── variables.css                 # CSS custom properties (colors, spacing)
│   ├── typography.css                # Typography styles
│   └── utilities.css                 # Utility classes
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── banners/
│   │   └── products/
│   ├── icons/
│   └── fonts/
│
├── next.config.ts
├── tsconfig.json
└── package.json
```