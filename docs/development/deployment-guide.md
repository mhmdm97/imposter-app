# 🚀 Deployment Guide

## Overview

This guide covers deployment strategies for the Imposter App, from local builds to production hosting.

## Build Process

### Production Build
```bash
# Create optimized production build
npm run build

# Preview the build locally
npm run preview
```

### Build Output
The build creates an optimized bundle in the `build/` directory:
```
build/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js     # Main application bundle
│   ├── vendor-[hash].js    # Third-party dependencies
│   ├── motion-[hash].js    # Framer Motion bundle
│   └── index-[hash].css    # Styles
└── static/                 # Static assets (icons, manifest)
```

## Deployment Platforms

### Netlify (Recommended)

#### Automatic Deployment
1. Connect your repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18` or higher

#### Manual Deployment
```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npx netlify deploy --prod --dir=build
```

### Vercel

#### Automatic Deployment
1. Connect repository to Vercel
2. Vercel automatically detects Vite configuration
3. Deploy with default settings

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
npm run build
vercel --prod
```

### GitHub Pages

#### Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Traditional Hosting

For traditional web hosting (Apache, Nginx):

1. Build the project: `npm run build`
2. Upload the `build/` directory contents to your web server
3. Configure your server for SPA routing (see below)

## Server Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

### Apache Configuration (.htaccess)
```apache
RewriteEngine On

# Handle SPA routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
```

## Environment Variables

### Production Environment
Create a `.env.production` file for production-specific settings:

```env
VITE_API_URL=https://api.yourapp.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Environment-Specific Builds
```bash
# Development build
npm run build

# Production build with specific env
NODE_ENV=production npm run build
```

## Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build

# Use bundle analyzer (install first)
npm install --save-dev rollup-plugin-visualizer
```

### Build Optimization Tips

1. **Code Splitting**: Vite automatically splits vendor and app bundles
2. **Tree Shaking**: Remove unused code automatically
3. **Asset Optimization**: Images and assets are optimized during build
4. **Compression**: Enable gzip/brotli on your server

### Lighthouse Optimization

Run Lighthouse audits and optimize for:
- **Performance**: Fast loading times
- **Accessibility**: WCAG compliance
- **Best Practices**: Security and modern standards
- **SEO**: Search engine optimization

## Monitoring and Analytics

### Error Tracking
Consider integrating error tracking:

```typescript
// Example with Sentry
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring
```typescript
// Web Vitals reporting
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to your analytics service
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Security Considerations

### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
">
```

### HTTPS Configuration
- Always serve over HTTPS in production
- Use HSTS headers
- Configure proper SSL certificates

### Security Headers
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:run
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Troubleshooting

### Common Build Issues

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### TypeScript Errors
```bash
# Check types separately
npm run type-check

# Build without type checking (not recommended for production)
npm run build -- --mode development
```

### Deployment Issues

#### 404 Errors on Refresh
- Ensure SPA routing is configured on your server
- Check that all routes fall back to `index.html`

#### Assets Not Loading
- Verify the base URL configuration
- Check that asset paths are correct
- Ensure proper CORS headers if serving from CDN

## Rollback Strategy

### Quick Rollback
1. Keep previous build artifacts
2. Use blue-green deployment strategy
3. Monitor deployment health checks
4. Have automated rollback triggers

### Manual Rollback
```bash
# If using Netlify
netlify rollback

# If using manual deployment
# Restore previous build directory
```

---

*For platform-specific deployment guides, refer to the hosting provider's documentation.*
