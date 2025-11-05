import { FaBan } from 'react-icons/fa6';

type Props = {
  primaryColor: string | undefined | null;
  secondaryColor: string | undefined | null;
  disableRightMargin?: boolean;
};

const ColorPreview = ({
  primaryColor,
  secondaryColor,
  disableRightMargin,
}: Props) => {
  return !primaryColor || !secondaryColor ? (
    <FaBan />
  ) : (
    <div
      style={{
        background:
          'linear-gradient(225deg, ' +
          primaryColor +
          ' 50%, ' +
          secondaryColor +
          ' 50%)',
        height: 24,
        width: 24,
        minHeight: 24,
        minWidth: 24,
        marginRight: disableRightMargin ? 0 : 12,
        alignSelf: 'center',
        borderRadius: '6px',
      }}
    />
  );
};
export default ColorPreview;
