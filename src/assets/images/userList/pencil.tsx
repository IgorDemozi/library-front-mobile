import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const Pencil = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 44}
      height={size !== undefined ? size : 32}
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
      />
    </Svg>
  );
};

export default Pencil;
