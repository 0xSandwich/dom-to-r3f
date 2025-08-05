# dom-to-r3f

A React library for converting DOM elements to React Three Fiber components, enabling seamless integration between traditional DOM elements and 3D WebGL content.

## 🚀 Live Demo

**[View Live Demo](https://0xsandwich.github.io/dom-to-r3f/)**

Experience the library in action with interactive shader effects, wave animations, and 3D image transformations.

## Installation

```bash
npm install dom-to-r3f
# or
yarn add dom-to-r3f
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-dom @react-three/fiber three
# or
yarn add react react-dom @react-three/fiber three
```

## Quick Start

### 1. Wrap your app with DomToFiberProvider

```jsx
import { DomToFiberProvider } from 'dom-to-r3f';

function App() {
  return (
    <DomToFiberProvider>
      {/* Your entire app content */}
    </DomToFiberProvider>
  );
}
```

### 2. Use FiberImage for images you want in the three context.

```jsx
import { FiberImage } from 'dom-to-r3f';

<FiberImage 
  src="/image.jpg"
  alt="My 3D Image"
  vertexShader="..." // optional
  fragmentShader="..." // optional
  uniforms={{}} // optional
  onUniformUpdate={(uniforms, frame) => {}} // optional
  styles={{}} // optional
/>
```

### 3. Get scroll position with useScroll

```jsx
import { useScroll } from 'dom-to-r3f';

function MyComponent() {
  const { scrollPosition } = useScroll();
  
  return (
    <div>
      {/* Your content */}
    </div>
  );
}
```

### 4. Wrap your 3D scene with CanvasWrapper

```jsx
import { CanvasWrapper } from 'dom-to-r3f';

<CanvasWrapper value={scrollPosition}>
  {/* Your 3D elements */}
  <mesh position={[0, scrollPosition, 0]}>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</CanvasWrapper>
```

## Complete Example

```jsx
import React from 'react';
import { DomToFiberProvider, FiberImage, useScroll, CanvasWrapper } from 'dom-to-r3f';

function AppContent() {
  const { scrollPosition } = useScroll();
  
  return (
    <div>
      {/* Your DOM content */}
      <h1>My App</h1>
      
      {/* Images that will be recreated in 3D */}
      <FiberImage 
        src="/image1.jpg" 
        alt="3D Image 1" 
      />
      <FiberImage 
        src="/image2.jpg" 
        alt="3D Image 2" 
      />
      
      {/* 3D Scene */}
      <CanvasWrapper value={scrollPosition}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Your 3D elements */}
        <mesh position={[0, scrollPosition, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </CanvasWrapper>
    </div>
  );
}

export default function App() {
  return (
    <DomToFiberProvider>
      <AppContent />
    </DomToFiberProvider>
  );
}
```

## Demo & Examples

This repository includes a complete demo showcasing various shader effects and implementations:

- **Demo**: Located in `src/` - Run with `npm run start`
- **Library Source**: Located in `src/lib/` - The actual library code
- **Shader Examples**: Check `src/components/ShaderExamples.js` for advanced shader implementations

### Running the Demo

```bash
npm install
npm run start
```

The demo includes examples of:
- Wave effects
- Color shifting
- Displacement mapping
- Pixelation effects
- Mouse-based distortion
- Audio-reactive effects
- Curtains.js-style wave effects

## API Reference

### DomToFiberProvider
Context provider that manages the DOM to Fiber conversion state. Wrap your entire app with this component.

### FiberImage
Converts images to 3D textures in Three.js.

**Props:**
- `src` (string) - Image source URL
- `alt` (string) - Image alt text
- `vertexShader` (string, optional) - Custom vertex shader code
- `fragmentShader` (string, optional) - Custom fragment shader code
- `uniforms` (object, optional) - Custom uniforms object for shaders
- `onUniformUpdate` (function, optional) - Callback for custom uniform updates
- `styles` (object, optional) - Custom CSS styles

### useScroll
Hook that provides scroll position for 3D animations.

**Returns:**
- `scrollPosition` (number) - Current scroll position that can be used for 3D positioning

### CanvasWrapper
Wrapper component for React Three Fiber Canvas that renders FiberImages and additional 3D content.

**Props:**
- `value` (number) - Scroll position from useScroll hook

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
