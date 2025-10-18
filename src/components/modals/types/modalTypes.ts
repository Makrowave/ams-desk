import { ModelRecord } from '../../../app/types/bikeTypes';

export type ModalProps = {
  closeModal?: () => void;
};

export type ModelModalProps = ModalProps & {
  model: ModelRecord;
};

export type BikeModalProps = ModalProps & {
  bikeId: number;
};
