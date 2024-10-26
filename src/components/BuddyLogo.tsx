
interface BuddyLogoProps {
  width?: number | string,
  height?: number | string,
  min?: boolean
}

const BuddyLogo = ({width, height, min}: BuddyLogoProps) => {
  return (
    <img src={min ? "/buddy_logo_min.svg" : "/buddy_logo.svg"}
         alt="Buddy"
         width={width}
         height={height}
    />
  )
}

export default BuddyLogo;
