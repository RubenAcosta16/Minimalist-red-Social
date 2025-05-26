export type CommentDTO = {
  idPublication: string;
  content: string;
};

export type CommentUpdateDTO = {
  id: string;
  idPublication: string;
  content: string;
};
