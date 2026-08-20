import styles from './styles.module.css';

type ChoiceChipsProps = {
    value: "rent" | "sale";
    onChange: (value: string) => void;
}
  
const ChoiceChips = ({ value = "rent", onChange }:ChoiceChipsProps) => {

  const handleChipClick = (e: React.MouseEvent<HTMLButtonElement>, newPurpose: string) => {
      e.preventDefault();
      if (newPurpose !== value) {
        onChange(newPurpose);
      }
  };
  
  const activeIndex = value === "rent" ? 0 : 1;
  
  return (
    <div className={styles.choiceChips}>
        <div className={styles.choiceChipsBg} style={{ left: `${activeIndex * 50}%` }}></div>
        <button
          className={`${styles.choiceChip} ${activeIndex === 0 ? styles.active : ""}`}
          onClick={(e) => handleChipClick(e, "rent")}
        >
          Rent
        </button>
        <button
          className={`${styles.choiceChip} ${activeIndex === 1 ? "active" : ""}`}
          onClick={(e) => handleChipClick(e, "sale")}
        >
          Buy
        </button>
    </div>
  );
};
  
export default ChoiceChips;