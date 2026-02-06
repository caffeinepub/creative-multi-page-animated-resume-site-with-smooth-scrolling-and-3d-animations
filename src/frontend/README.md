# Creative Portfolio Website

A modern, animated personal portfolio website featuring smooth scrolling, 3D animations, and creative visual elements.

## Features

- Multi-page navigation with smooth transitions
- 3D animated scenes using Three.js
- Scroll-based reveal animations
- Responsive design for all devices
- Dark mode support
- Accessibility-friendly (respects reduced motion preferences)

## Replacing Images

To replace the profile photo and certificate images with your own:

1. Navigate to `frontend/public/assets/generated/`
2. Replace the following files with your own images (keep the same filenames):
   - `profile-photo.dim_800x800.png` - Your profile photo (800x800px recommended)
   - `certificate-01.dim_1400x1000.png` - First certificate (1400x1000px recommended)
   - `certificate-02.dim_1400x1000.png` - Second certificate (1400x1000px recommended)
   - `bg-texture.dim_2048x2048.png` - Background texture (2048x2048px recommended)

No code changes are needed - the images will automatically appear in the UI.

## Adding More Certificates

To add more certificates, edit `frontend/src/data/certificates.ts`:

1. Add your certificate image to `frontend/public/assets/generated/`
2. Add a new entry to the certificates array:

