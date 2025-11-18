# 🏊‍♀️ Danielle's Swimming Academy

A fun, interactive web app to teach someone how to swim! Built with playful roasting and encouragement. 😏

## 🌟 Features

### 🏊 Swimming Basics

- 6 step-by-step lessons from getting comfortable in water to swimming
- Progress tracking with localStorage
- Interactive checklist to mark completed steps
- Encouraging tips and explanations

### 💪 Swimming Strokes

- Learn 4 major swimming strokes:
  - Freestyle (Front Crawl)
  - Backstroke
  - Breaststroke
  - Butterfly
- Expandable cards with detailed instructions
- Difficulty levels
- Pro tips for each stroke

### 😮‍💨 Breathing Techniques

- Interactive breathing practice tool
- Animated breathing visualization (inhale, hold, exhale)
- Stroke-specific breathing guides
- Practical drills to practice

### 🛟 Water Safety

- Essential safety rules
- Emergency procedures
- Open water vs pool safety
- Critical safety badges

### 🎯 Knowledge Quiz

- 8 questions to test what you've learned
- Instant feedback with explanations
- Score tracking
- Motivational (and slightly roasting) results

### 🏆 Progress Tracking

- Visual progress circle
- Achievement badges
- Stats dashboard
- Personalized next steps

## 🚀 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool (using Rolldown)
- **Framer Motion** - Smooth animations
- **React Router** - Navigation
- **LocalStorage** - Progress persistence
- **CSS3** - Styling with gradients and animations

## 📱 Mobile-First Design

The entire app is optimized for mobile viewing with:

- Responsive grid layouts
- Touch-friendly buttons
- Mobile-optimized typography
- Smooth animations

## 🎮 How to Use

1. **Start with Basics** - Learn foundational swimming skills
2. **Explore Strokes** - Master different swimming techniques
3. **Practice Breathing** - Use the interactive breathing tool
4. **Read Safety** - Understand water safety rules
5. **Take the Quiz** - Test your knowledge
6. **Track Progress** - See your achievements and next steps

## 🚀 Deployment

This app is ready for deployment on various platforms:

### Render

1. Connect your GitHub repository to Render
2. Choose "Static Site" as the service type
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. The `render.yaml` file handles routing configuration

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. The `vercel.json` file ensures proper client-side routing

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. The `_redirects` file in the `public` folder handles routing

### Manual Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview locally
npm run preview

# The dist folder contains all files needed for deployment
```

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## 🎨 Key Components

- `Home.jsx` - Landing page with lesson cards
- `Basics.jsx` - Step-by-step swimming fundamentals
- `Strokes.jsx` - Detailed stroke instructions
- `Breathing.jsx` - Interactive breathing exercises
- `Safety.jsx` - Water safety information
- `Quiz.jsx` - Knowledge test with scoring
- `Progress.jsx` - Achievement tracking

## 💾 Data Persistence

Progress is saved locally using `localStorage`:

- Completed basic steps
- Quiz scores
- Unlocked achievements

## 🎯 Features Highlights

### Interactive Elements

- ✅ Clickable checkboxes for progress
- 🌀 Animated breathing visualization
- 📊 Progress circles and bars
- 🏆 Achievement unlock system
- 🎨 Smooth page transitions

### Playful Content

- 😏 Friendly teasing throughout
- 💪 Motivational messages
- 🎉 Celebration of progress
- 😅 Gentle roasts for motivation

## 🌐 Deployment

This is a standard Vite React app that can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Future Enhancements

- Add video demonstrations
- Include diagrams/illustrations
- Add more quiz questions
- Social sharing of achievements
- Multi-language support
- Dark mode

## 💖 Built With Love (and Gentle Roasting)

Created to finally teach Danielle how to swim! 🏊‍♀️
No more excuses! 😎

---

**Note**: This is a tutorial/educational app. Always practice swimming with proper supervision and follow real safety guidelines!

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
