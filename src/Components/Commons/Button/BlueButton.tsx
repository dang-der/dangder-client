import styled from "@emotion/styled";
import { MainColor } from "../../../../styles/GlobalStyles";

export const Wrapper = styled.button`
  width: 100%;
  border-radius: 6.25rem;
  height: 3.125rem;
  background-color: ${MainColor};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: none;

  @media (min-width: 576px) {
    width: calc(576px - (576px / 2));
  }
`;

interface LargeButtonProps {
  title: string;
  onClick: any;
  isActive?: boolean;
  style?: any;
}

export default function BlueButton({
  title,
  onClick,
  style,
}: LargeButtonProps) {
  return (
    <Wrapper type="button" onClick={() => onClick()} style={style}>
      {title}
    </Wrapper>
  );
}
