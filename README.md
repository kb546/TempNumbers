# TempNumbers Website

A modern, responsive website for TempNumbers, educating people about digital privacy and the importance of having a second temporary phone number.

## Features

- Clean, responsive design with mobile-first approach
- Fast-loading with smooth animations using Framer Motion
- Dark mode support
- Built with Next.js 14, React, and Tailwind CSS
- Blog system with rich content support
- Social media integration (TikTok, Instagram, YouTube)
- UTM tracking for all Quackr links

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd temp-numbers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
└── styles/               # Global styles
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Blog Posts

Blog posts can be added by creating new files in the `src/app/blog/posts` directory using MDX format.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
