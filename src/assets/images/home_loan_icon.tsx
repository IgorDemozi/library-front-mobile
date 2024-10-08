import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../interfaces/Icon';

const HomeLoanIcon = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 38}
      height={size !== undefined ? size : 42}
      viewBox="0 0 38 42"
    >
      <Path
        id="pending_actions_FILL0_wght400_GRAD0_opsz48"
        d="M34.55,44a9.475,9.475,0,0,1-9.45-9.45,9.475,9.475,0,0,1,9.45-9.45A9.475,9.475,0,0,1,44,34.55,9.475,9.475,0,0,1,34.55,44Zm2.9-4.4,1.4-1.4L35.1,34.45v-5.6H33.15v6.3ZM9,41.3a2.988,2.988,0,0,1-3-3V9.2a2.988,2.988,0,0,1,3-3h9.25A5.049,5.049,0,0,1,20.1,3.225,5.3,5.3,0,0,1,23.55,2a5.429,5.429,0,0,1,3.5,1.25,4.6,4.6,0,0,1,1.8,2.95H38.1a2.988,2.988,0,0,1,3,3V23.95a14.022,14.022,0,0,0-1.475-.775A13.753,13.753,0,0,0,38.1,22.6V9.2H32.8v6.5H14.3V9.2H9V38.3H22.65a12.436,12.436,0,0,0,.6,1.475A16.113,16.113,0,0,0,24.1,41.3ZM23.55,9.4a2.22,2.22,0,0,0,2.2-2.2A2.2,2.2,0,1,0,22,8.75,2.116,2.116,0,0,0,23.55,9.4Z"
        transform="translate(-6 -2)"
        fill={color}
      />
    </Svg>
  );
};

export default HomeLoanIcon;
