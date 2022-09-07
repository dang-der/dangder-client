import styled from "@emotion/styled";

export interface LineInputProps {
  register: any;
  registerOption?: any;
  type: string;
  name: string;
  placeholder?: string;
  style?: any;
}

const Wrapper = styled.div`
  width: 100%;

  input {
    width: 100%;
    border: none;
    padding: 0.313rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #000000;
  }
`;

export default function LineInput({
  register,
  registerOption,
  type,
  name,
  placeholder,
  style,
}: LineInputProps) {
  return (
    <Wrapper>
      <input
        type={type}
        {...register(name, registerOption)}
        placeholder={placeholder}
        style={style}
      />
    </Wrapper>
  );
}
