# Get Blessed Barbershop — Website

Custom-built website for **Get Blessed Barbershop** in Valdosta, GA.  
Static HTML + Tailwind CSS + Vanilla JS — zero build steps, zero dependencies.

---

## 🚀 Quick Start

1. Open `index.html` in any browser to preview the site
2. All files are static — no build tools or npm required

---

## 📁 File Structure

```
├── index.html            # Main single-page website
├── style-overrides.css   # Custom animations & transitions
├── script.js             # Interactivity (menu, lightbox, scroll effects)
├── CNAME                 # GitHub Pages custom domain (create when ready)
└── README.md             # This file
```

---

## 🌐 Deploying to GitHub Pages

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Get Blessed Barbershop website"
git remote add origin https://github.com/YOUR_USERNAME/get-blessed-barbershop.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/get-blessed-barbershop/`

### 3. Custom Domain (when ready to go live)

1. Create a `CNAME` file in the repo root with the content:
   ```
   getblessedbarbers.com
   ```
2. In the domain registrar (GoDaddy, Namecheap, etc.), update DNS:
   - **A Records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME Record** for `www` → `YOUR_USERNAME.github.io`
3. In GitHub repo Settings → Pages, enter `getblessedbarbers.com` as custom domain
4. Check "Enforce HTTPS"

---

## ✏️ Things to Customize Before Going Live

### Images
Replace all placeholder Unsplash images with real photos from the shop:
- **Hero background** — shop interior or barber at work
- **Gallery images** — actual haircut photos, before/after shots
- **About section** — photo of Alberto / team

### Booksy Link
Update all `href="https://booksy.com"` links with the actual Booksy booking page URL.

### Social Media Links
Update the Facebook and Instagram links in the footer with the real profile URLs.

### Contact Form
The form uses [Formspree](https://formspree.io) for serverless form handling:
1. Sign up at formspree.io (free tier = 50 submissions/month)
2. Create a new form
3. Replace `YOUR_FORM_ID` in the form action URL with your actual form ID

### Prices
Verify all service prices with the shop owner. Prices marked "TBD" in the plan were estimated:
- Beard Trim: $25 (placeholder)
- Head Shave: $35 (placeholder)
- Custom Designs: $15+ (placeholder)
- Scalp Treatment: $45 (placeholder)

### Logo
If a logo file becomes available, add it to the header next to the text branding.

### Schema.org Data
Update the aggregate rating numbers in the JSON-LD schema if needed.

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure |
| Tailwind CSS (CDN) | Utility-first styling |
| Vanilla JavaScript | Interactivity |
| Google Fonts | Archivo Narrow typeface |
| Formspree | Contact form backend |
| GitHub Pages | Free static hosting |

---

## 📱 Browser Support

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+
- Mobile Safari (iOS 14+)
- Chrome for Android

---

Built by Byron | © 2024 Get Blessed Barbershop
