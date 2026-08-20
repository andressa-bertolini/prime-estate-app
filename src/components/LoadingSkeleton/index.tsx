import styles from './styles.module.css';

type LoadingSkeletonProps = {
  itemsPerRow: number;
};

const LoadingSkeleton = ({ itemsPerRow }: LoadingSkeletonProps) => {
  return(
      <div className={`${styles.skeleton}`} style={{ "--items-per-row": itemsPerRow } as React.CSSProperties}>
          <div className={styles.skeletonCover}></div>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonContent}></div>
      </div>
  )
}
export default LoadingSkeleton;