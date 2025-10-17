import { FaBan } from 'react-icons/fa6';

type Props = {
  primaryColor: string | null;
  secondaryColor: string | null;
};

const ColorPreview = ({ primaryColor, secondaryColor }: Props) => {
  return primaryColor === null || secondaryColor === null ? (
    <FaBan className="h-6 w-6 mr-3" />
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
        marginRight: 12,
        alignSelf: 'center',
        borderRadius: '6px',
      }}
    />
  );
};
export default ColorPreview;
