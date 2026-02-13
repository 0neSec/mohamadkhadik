// src/global.d.ts
export { }

declare global {
  declare module '*.glb'
  declare module '*.png'
  declare module '*.gltf'
  
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}