export type PublicationDTO = {
  content: string;
  imageFile: Buffer | undefined;
};

export type PublicationUpdateDTO = {
  id: string;
  content: string;
  imageFile: Buffer | undefined;
};
