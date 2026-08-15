interface ChoiceChipsProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  const ChoiceChips: React.FC<ChoiceChipsProps> = ({ value, onChange }) => {
    const handleChipClick = (e: React.MouseEvent<HTMLButtonElement>, newPurpose: string) => {
      e.preventDefault();
      if (newPurpose !== value) {
        onChange(newPurpose);
      }
    };
  
    const activeIndex = value === "rent" ? 0 : 1;
  
    return (
      <div className="choice-chips">
        <div className="choice-chip__bg" style={{ left: `${activeIndex * 50}%` }}></div>
        <button
          className={`choice-chip ${activeIndex === 0 ? "active" : ""}`}
          onClick={(e) => handleChipClick(e, "rent")}
        >
          Rent
        </button>
        <button
          className={`choice-chip ${activeIndex === 1 ? "active" : ""}`}
          onClick={(e) => handleChipClick(e, "sale")}
        >
          Buy
        </button>
        <input className="choice-chip__value" type="hidden" value={value} />
      </div>
    );
  };
  
  export default ChoiceChips;
  