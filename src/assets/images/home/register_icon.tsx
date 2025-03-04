import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const RegisterIcon = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 40}
      height={size !== undefined ? size : 40}
      viewBox="0 0 40 40"
    >
      <Path
        id="add_circle_FILL0_wght400_GRAD0_opsz48"
        d="M22.65,34h3V25.7H34v-3H25.65V14h-3v8.7H14v3h8.65ZM24,44a20.285,20.285,0,0,1-7.9-1.525A19.357,19.357,0,0,1,5.525,31.9,20.285,20.285,0,0,1,4,24a20.156,20.156,0,0,1,1.525-7.85A19.52,19.52,0,0,1,9.75,9.8,19.939,19.939,0,0,1,24,4,19.84,19.84,0,0,1,44,24a19.939,19.939,0,0,1-5.8,14.25,19.52,19.52,0,0,1-6.35,4.225A20.156,20.156,0,0,1,24,44Zm0-20Zm0,17a16.366,16.366,0,0,0,12-5,16.366,16.366,0,0,0,5-12,16.366,16.366,0,0,0-5-12A16.366,16.366,0,0,0,24,7a16.366,16.366,0,0,0-12,5A16.366,16.366,0,0,0,7,24a16.366,16.366,0,0,0,5,12A16.366,16.366,0,0,0,24,41Z"
        transform="translate(-4 -4)"
        fill={color}
      />
    </Svg>
  );
};

export default RegisterIcon;
