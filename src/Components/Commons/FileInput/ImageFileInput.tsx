import styled from "@emotion/styled";
import { ChangeEvent, useRef } from "react";
import { checkValidationFile } from "../../../Commons/Library/ValidationFile";

const UploadImageButton = styled.img`
  width: 4.813rem;
  height: 5.375rem;
  border-radius: 1rem;
  margin-right: 0.813rem;
  margin-top: 0.875rem;
`;

interface ImageFileInputProps {
  defaultImageUrl?: string;
  onChangeFile: (file: File) => void;
}

export default function ImageFileInput({
  defaultImageUrl,
  onChangeFile,
}: ImageFileInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickUploadImageButton = () => {
    fileRef.current?.click();
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!checkValidationFile(file)) return;

    onChangeFile(file);
  };

  return (
    <div onClick={onClickUploadImageButton}>
      <UploadImageButton src={defaultImageUrl || "/ic_upload_image.svg"} />
      <input type="file" hidden ref={fileRef} onChange={onChangeFileInput} />
    </div>
  );
}
