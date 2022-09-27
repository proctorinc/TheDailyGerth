import Card from "@components/image/Card";
import CardSkeleton from "@components/image/CardSkeleton";

const ImageCardModal = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) {
    return <></>;
  }

  return (
    <label className="modal modal-open cursor-pointer">
      <label className="modal-box relative rounded-lg h-full">
        <label
          onClick={onClose}
          className="btn btn-sm btn-ghost absolute right-0 top-0 text-xl"
        >
          ✕
        </label>
        {image ? <Card image={image} /> : <CardSkeleton />}
      </label>
    </label>
  );
};

export default ImageCardModal;
