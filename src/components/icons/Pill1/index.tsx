import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Pill1 = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M21 0H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z"
      fill="#FF5100"
    />
    <Path
      d="M5.006 19.032a3.486 3.486 0 0 1 0-4.93L9.508 9.6l4.93 4.93-4.502 4.502a3.486 3.486 0 0 1-4.93 0Z"
      fill="#1E1E1E"
    />
    <Path
      d="M18.953 5.006a3.486 3.486 0 0 0-4.93 0L9.46 9.571l4.93 4.93 4.564-4.565a3.486 3.486 0 0 0 0-4.93Z"
      fill="#fff"
      opacity={0.9}
    />
    <Path
      d="m10.719 8.31-1.26 1.26 4.93 4.93 1.26-1.26-4.93-4.93Z"
      fill="#fff"
    />
    <Path
      opacity={0.1}
      d="m11.142 7.906-1.26 1.26 4.93 4.93 1.26-1.26-4.93-4.93Z"
      fill="#000"
    />
    <Path
      d="m10.719 8.33-1.26 1.26 4.93 4.93 1.26-1.26-4.93-4.93Z"
      fill="#fff"
    />
  </Svg>
)

export default Pill1
