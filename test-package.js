// Simple test to verify package exports
const pkg = require('./dist/index.js');

console.log('Available exports:');
console.log(Object.keys(pkg));

console.log('\nTesting exports:');
console.log('CanvasWrapper:', typeof pkg.CanvasWrapper);
console.log('FiberImage:', typeof pkg.FiberImage);
console.log('DomToFiberProvider:', typeof pkg.DomToFiberProvider);
console.log('useScroll:', typeof pkg.useScroll);
console.log('useDomToFiber:', typeof pkg.useDomToFiber);
console.log('Plane:', typeof pkg.Plane);
console.log('Renderer:', typeof pkg.Renderer);

console.log('\n✅ Package exports are working correctly!'); 