import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const UserIconDelete = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 44}
      height={size !== undefined ? size : 32}
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4s4-1.79 4-4m-2 0c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2M2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4m2 0c.2-.71 3.3-2 6-2c2.69 0 5.77 1.28 6 2zm13-8h6v2h-6z"
      />
    </Svg>
  );
};

export default UserIconDelete;
