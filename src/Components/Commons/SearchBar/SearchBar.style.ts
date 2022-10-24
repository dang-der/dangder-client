import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const InputWrapper = styled.input`
  flex-grow: 10;
  border: none;
  padding: 0 1rem;
  margin-right: 1rem;
`;

export const ButtonWrapper = styled.button`
  flex-grow: 1;
  background: none;
  border: none;
`;
