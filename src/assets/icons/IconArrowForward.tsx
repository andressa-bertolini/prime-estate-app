type IconArrowForwardProps = {
    color?: string;
  };
  
  const IconArrowForward = ({ color = 'black' }: IconArrowForwardProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <polygon
          fill={color}
          points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"
        />
      </svg>
    );
  };
  
  export default IconArrowForward;