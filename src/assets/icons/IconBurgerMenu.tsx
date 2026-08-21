type IconBurgerMenuProps = {
    color?: string;
};
  
const IconBurgerMenu = ({ color = 'black' }: IconBurgerMenuProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 12"
        width="24"
        height="24"
      >
      <g>
        <rect fill={color} height="1" width="11" x="0.5" y="5.5"/>
        <rect fill={color} height="1" width="11" x="0.5" y="2.5"/>
        <rect fill={color} height="1" width="11" x="0.5" y="8.5"/>
      </g>
      </svg>
    );
};
  
export default IconBurgerMenu;