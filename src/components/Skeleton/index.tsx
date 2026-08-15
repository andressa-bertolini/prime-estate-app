type SkeletonProps = {
  grid: number | string;
};

const Skeleton = ({ grid }: SkeletonProps) => {
  return(
      <div className={`skeleton skeleton-${grid}`}>
          <div className="skeleton-cover"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-content"></div>
      </div>
  )
}
export default Skeleton;
