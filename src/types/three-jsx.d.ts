import { Object3DNode, BufferGeometryNode, MaterialNode } from '@react-three/fiber';
import { Mesh, Group, Line, Points, Color, BufferGeometry, Material } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: Object3DNode<Mesh, typeof Mesh>;
      group: Object3DNode<Group, typeof Group>;
      line: Object3DNode<Line, typeof Line>;
      points: Object3DNode<Points, typeof Points>;
      boxGeometry: BufferGeometryNode<BufferGeometry, typeof BufferGeometry>;
      color: { attach: string; args: [string] };
      fog: { attach: string; args: [string, number, number] };
      ambientLight: { intensity?: number };
      pointLight: { position: [number, number, number]; intensity?: number; color?: string | Color };
    }
  }
} 