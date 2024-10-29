import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const SearchIcon = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 17}
      height={size !== undefined ? size : 17}
      viewBox="0 0 17 17"
    >
      <Path
        id="Caminho_263"
        data-name="Caminho 263"
        d="M15.15,13.692h-.768l-.272-.262a6.327,6.327,0,1,0-.68.68l.262.272v.768L18.552,20,20,18.552Zm-5.832,0a4.374,4.374,0,1,1,4.374-4.374A4.368,4.368,0,0,1,9.318,13.692Z"
        transform="translate(-3 -3)"
        fill={color ?? '#adb5bd'}
      />
    </Svg>
  );
};

export default SearchIcon;
