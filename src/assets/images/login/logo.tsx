import Svg, { G, Path, Rect, Text, TSpan } from 'react-native-svg';
import { IconProps } from '../../../interfaces/Icon';

const Logo = ({ color, size }: IconProps) => {
  return (
    <Svg
      width={size !== undefined ? size : 123.5}
      height={size !== undefined ? size : 53}
      viewBox="0 0 123.5 53"
    >
      <G id="Logo" transform="translate(-763.5 -38.129)">
        <Rect
          id="Retângulo_323"
          data-name="Retângulo 323"
          width="38.088"
          height="45.967"
          transform="translate(766.828 41.764)"
          fill="#ffc501"
        />
        <G id="book" transform="translate(766 40.629)">
          <Path
            id="Caminho_476"
            data-name="Caminho 476"
            d="M4,23.05A6.05,6.05,0,0,1,10.05,17H42.72"
            transform="translate(-4 18.9)"
            fill="rgba(0,0,0,0)"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="5"
          />
          <Path
            id="Caminho_477"
            data-name="Caminho 477"
            d="M10.05,2H42.72V50H10.05A6.025,6.025,0,0,1,4,44V8a6.025,6.025,0,0,1,6.05-6Z"
            transform="translate(-4 -2)"
            fill={color ?? 'rgba(0,0,0,0)'}
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="5"
          />
        </G>
        <Text id="L" transform="translate(777 68.63)" font-size="29" font-family="Constantia">
          <TSpan x="0" y="0">
            L
          </TSpan>
        </Text>
        <Text id="ibrary" transform="translate(812 68.63)" font-size="29" font-family="Constantia">
          <TSpan x="0" y="0">
            ibrary
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
};

export default Logo;
