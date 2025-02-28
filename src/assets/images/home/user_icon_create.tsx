import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const UserIconCreate = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 44}
      height={size !== undefined ? size : 32}
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M20 9V6h-2v3h-3v2h3v3h2v-3h3V9zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m6.39 8.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66M15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15s4.29.73 5.48 1.34c.32.16.52.5.52.88z"
      />
    </Svg>
  );
};

export default UserIconCreate;
