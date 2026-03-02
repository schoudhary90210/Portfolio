import { useMemo } from 'react'
import { Text } from '@react-three/drei'

/* Short status lines per project */
const SCREEN_STATUS = {
  t01: 'SHARPE 0.80 | CAGR 18.4%',
  t02: 'F1 97.9% | GCP ACTIVE',
  t03: 'ACC 94% | LATENCY <150ms',
  t04: '6M OPS/S | 8 THREADS',
  t05: 'GPT-4 READY | PIPE ACTIVE',
  t06: 'DOCKER OK | 3+ TEAMS',
}

export default function TerminalScreen({ project, position, color }) {
  const status = useMemo(() => SCREEN_STATUS[project.id] || 'READY', [project.id])

  return (
    <group position={position}>
      {/* Terminal ID — top left */}
      <Text
        position={[-0.48, 0.28, 0.001]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="left"
        anchorY="top"
      >
        {project.terminal}
      </Text>

      {/* ACTIVE indicator — top right */}
      <Text
        position={[0.48, 0.28, 0.001]}
        fontSize={0.04}
        color={color}
        anchorX="right"
        anchorY="top"
        outlineWidth={0.002}
        outlineColor={color}
        outlineBlur={0.008}
      >
        ACTIVE
      </Text>

      {/* Separator line */}
      <Text
        position={[0, 0.19, 0.001]}
        fontSize={0.035}
        color={color}
        anchorX="center"
        anchorY="top"
        letterSpacing={-0.05}
      >
        {'________________________'}
      </Text>

      {/* Project name — BIG, white, strong glow */}
      <Text
        position={[0, 0.04, 0.002]}
        fontSize={0.095}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.0}
        textAlign="center"
        fontWeight="bold"
        outlineWidth={0.008}
        outlineColor={color}
        outlineBlur={0.025}
      >
        {project.name.toUpperCase()}
      </Text>

      {/* Status line — brighter */}
      <Text
        position={[0, -0.12, 0.001]}
        fontSize={0.04}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.0}
        outlineWidth={0.003}
        outlineColor={color}
        outlineBlur={0.01}
      >
        {status}
      </Text>

      {/* Bottom prompt */}
      <Text
        position={[-0.48, -0.28, 0.001]}
        fontSize={0.035}
        color={color}
        anchorX="left"
        anchorY="bottom"
        outlineWidth={0.002}
        outlineColor={color}
        outlineBlur={0.006}
      >
        {'> CLICK TO VIEW_'}
      </Text>
    </group>
  )
}
