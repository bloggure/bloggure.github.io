# Bloggure.github.io Repository Documentation

This document provides a comprehensive overview of the Bloggure blog repository structure, workflow, and technical setup.

## Repository Overview

**Blog URL**: https://www.bloggure.info  
**Type**: Multi-author technical blog about programming, computing, and geek topics  
**Platform**: Jekyll static site generator  
**Hosting**: GitHub Pages with custom domain

## Directory Structure

```
bloggure.github.io/
├── _config.yml              # Main Jekyll configuration
├── _drafts/                # Draft posts (not published)
├── _includes/              # Reusable HTML components
├── _layouts/               # Page templates
├── _posts/                 # Published blog posts
├── _sass/                  # Sass stylesheets
├── assets/                 # Static assets (CSS, JS, fonts)
├── images/                 # Blog images and uploads
├── .github/workflows/      # GitHub Actions CI/CD
├── *.md                    # Author pages and special pages
└── Gemfile                 # Ruby dependencies
```

## Content Structure

### Posts
- **Location**: `_posts/`
- **Format**: HTML files with YAML front matter
- **Naming**: `YYYY-MM-DD-title.html`
- **Count**: 100+ published posts (2010-2021)
- **Categories**: .wicket, programming, tools, tutorials, etc.
- **Languages**: Primarily English, some French posts
- **Features**:
  - Multi-language support (English/French)
  - Code syntax highlighting
  - Disqus comments integration
  - Social sharing
  - Read time estimation

### Drafts
- **Location**: `_drafts/`
- **Format**: Markdown files
- **Purpose**: Unpublished content and ideas
- **Current drafts**: 8 files including topics on Swift, Git, MacOS, etc.

### Authors
- **Cedric Gatay** (`cgatay.md`) - Main author
- **Thomas de Barochez** (`tdebarochez.md`) - Contributor
- **Yannick Fonjallaz** (`yfonjallaz.md`) - Contributor

## Technical Stack

### Core Technologies
- **Static Site Generator**: Jekyll 3.9.5
- **Ruby Version**: 3.2.2 (via GitHub Actions)
- **Templating**: Liquid templates
- **Markdown Processor**: Kramdown with GFM support
- **Syntax Highlighting**: Coderay
- **CSS Preprocessor**: Sass/SCSS
- **JavaScript**: jQuery 1.9.1

### Key Plugins
- `jekyll-gist`: GitHub Gist embedding
- `jekyll-paginate`: Pagination support
- `jekyll-sitemap`: Automatic sitemap generation
- `jekyll-feed`: RSS feed generation
- `jekyll-asciidoc`: AsciiDoc support

### Frontend Components
- **CSS Framework**: Custom Sass-based theme
- **JavaScript Libraries**:
  - jQuery 1.9.1
  - Modernizr 2.6.2
  - Magnific Popup (lightbox)
  - FitVids (responsive videos)
  - DLMenu (mobile menu)
  - Respond.js (IE compatibility)
- **Fonts**: Font Awesome icons
- **Analytics**: Google Analytics (UA-11718843-3)

## Build & Deployment

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### GitHub Actions CI/CD
- **Workflow**: `.github/workflows/workflow.yml`
- **Trigger**: Push to `master` branch
- **Process**:
  1. Checkout code
  2. Setup Ruby 3.2.2
  3. Install dependencies and build site
  4. Deploy to `gh-pages` branch
- **Deployment Target**: GitHub Pages with custom domain

### Grunt Build System
- **Purpose**: Asset optimization
- **Tasks**:
  - `grunt`: Full build (clean, CSS, JS, image optimization)
  - `grunt dev`: Development mode with watch
- **Optimizations**:
  - CSS minification (recess)
  - JavaScript minification (uglify)
  - Image optimization (imagemin, svgmin)

## Content Workflow

### Creating a New Post
1. **Draft Phase**: Create file in `_drafts/` with format `YYYY-MM-DD-title.md`
2. **Content**: Write in Markdown/HTML with YAML front matter
3. **Front Matter Example**:
   ```yaml
   ---
   layout: post
   title: Post Title
   categories:
   - category1
   - category2
   tags:
   - tag1
   - tag2
   author: author_name
   ---
   ```
4. **Publish**: Move from `_drafts/` to `_posts/` when ready

### Post Features
- **Multi-language**: Use `<!--:en-->` and `<!--:fr-->` tags
- **Excerpts**: Use `<!--more-->` for post previews
- **Code Highlighting**: Use `{% highlight language %}` blocks
- **Images**: Store in `images/uploads/YYYY/MM/`
- **Categories & Tags**: Support hierarchical organization

## Theme & Design

### Layouts
- **post.html**: Main blog post template
- **page.html**: Static page template
- **post-index.html**: Post listing template

### Includes (Reusable Components)
- `head.html`: Head section with meta tags
- `navigation.html`: Main navigation menu
- `footer.html`: Footer with author info
- `disqus_comments.html`: Disqus integration
- `social-share.html`: Social sharing buttons
- `pagination.html`: Pagination controls
- `read-time.html`: Reading time estimation

### Styling
- **Sass Structure**: Modular SCSS files in `_sass/`
- **Main Stylesheet**: `assets/css/main.scss`
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Custom theme with syntax highlighting

## SEO & Analytics

### Configuration
- **Google Analytics**: UA-11718843-3
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **RSS Feed**: Auto-generated at `/feed.xml`
- **Permalinks**: `/:categories/:title/` format
- **Pagination**: 5 posts per page

### Metadata
- **Title**: Bloggure
- **Description**: Multi author blog about programming, computing and geek stuff
- **Timezone**: Europe/Paris
- **Language**: Primarily English with French content

## Multi-Author Setup

### Author Pages
Each author has a dedicated Markdown file:
- Contains bio and social links
- Uses `page` layout
- Example: `cgatay.md`, `tdebarochez.md`

### Post Attribution
- Posts include `author` field in front matter
- Author pages link to all posts by that author
- Social media links in author bios

## Historical Context

### Migration History
- **Original Platform**: WordPress (evident from post metadata)
- **Migration Date**: Around 2021 (based on file timestamps)
- **WordPress Artifacts**:
  - `dsq_thread_id` in front matter
  - `_wp_old_slug` metadata
  - Disqus comment system integration

### Content Timeline
- **First Post**: October 24, 2010
- **Last Post**: 2021 (based on file dates)
- **Total Posts**: 100+ technical articles
- **Topics**: Wicket, Java, JavaScript, MacOS, Git, databases, tools

## Maintenance Tasks

### Regular Maintenance
1. **Update Dependencies**:
   ```bash
   bundle update
   npm update
   ```
2. **Optimize Images**: Run `grunt imagemin`
3. **Check Broken Links**: Manual review or use link checker
4. **Update Author Info**: Keep author pages current

### Content Updates
1. **Add New Posts**: Place in `_posts/` directory
2. **Update Drafts**: Edit files in `_drafts/`
3. **Manage Categories/Tags**: Review and consolidate periodically
4. **Image Management**: Organize in `images/uploads/YYYY/MM/`

## Troubleshooting

### Common Issues
1. **Build Failures**:
   - Check Ruby version compatibility
   - Verify Gemfile dependencies
   - Clear `_site/` directory

2. **Asset Issues**:
   - Run `grunt` to rebuild optimized assets
   - Check file paths in includes

3. **Deployment Problems**:
   - Verify GitHub Actions workflow
   - Check `gh-pages` branch permissions
   - Review GitHub Pages settings

## Future Enhancements

### Potential Improvements
1. **Modernize Stack**:
   - Update Jekyll to latest version
   - Migrate from jQuery to modern JS
   - Replace Grunt with Webpack/Vite

2. **Content Features**:
   - Add search functionality
   - Implement newsletter subscription
   - Add related posts section

3. **Design Updates**:
   - Mobile optimization review
   - Dark mode support
   - Accessibility improvements

## License & Attribution

- **Content License**: Not explicitly stated (assume standard copyright)
- **Code Samples**: Various open source licenses
- **Theme**: Custom development with open source components

## Contact & Support

- **Primary Contact**: Cedric Gatay
- **GitHub Repository**: https://github.com/bloggure/bloggure.github.io
- **Blog URL**: https://www.bloggure.info

This documentation provides a comprehensive reference for maintaining and extending the Bloggure blog platform.