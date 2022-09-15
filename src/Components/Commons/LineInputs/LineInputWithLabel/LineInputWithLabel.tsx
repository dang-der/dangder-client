import styled from "@emotion/styled";
import { FieldError } from "react-hook-form";

interface LineInputWithLabelErrorProps {
  id?: string;
  register?: any;
  registerOption?: any;
  type: string;
  name: string;
  placeholder?: string;
  style?: any;
  label: string;
  error?: string | FieldError | undefined;
}

const Wrapper = styled.div`
  padding: 0.313rem;
  width: 100%;

  input {
    margin-top: 1.5rem;
    width: 100%;
    border: none;
    padding: 0.3rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #000000;
  }
`;

const LabelWrapper = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const ErrorWrapper = styled.span`
  color: red;
  font-size: 0.75rem;
`;

export default function LineInputWithLabelError({
  id,
  register,
  registerOption,
  type,
  name,
  placeholder,
  style,
  label,
  error,
}: LineInputWithLabelErrorProps) {
  return (
    <Wrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <input
        id={id}
        type={type}
        {...register?.(name, registerOption)}
        placeholder={placeholder}
        style={{ ...style }}
      />
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
    </Wrapper>
  );
}
