import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const AddIcon = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 24}
      height={size !== undefined ? size : 24}
      viewBox="0 0 24 24"
    >
      <Path
        id="Caminho_261"
        data-name="Caminho 261"
        d="M15.2,8H12.8v4.8H8v2.4h4.8V20h2.4V15.2H20V12.8H15.2ZM14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Zm0,21.6A9.6,9.6,0,1,1,23.6,14,9.613,9.613,0,0,1,14,23.6Z"
        transform="translate(-2 -2)"
        fill={color}
      />
    </Svg>
  );
};

export default AddIcon;
