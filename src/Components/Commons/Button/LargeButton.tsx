import styled from "@emotion/styled";

export interface ButtonStyleProps {
  isActive: boolean;
}
export const Wrapper = styled.button`
  width: 100%;
  border-radius: 6.25rem;
  height: 3.125rem;
  background-color: ${(props: ButtonStyleProps) =>
    props.isActive ? "#304ffe" : "gray"};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: none;

  @media (min-width: 575px) {
    width: calc(576px - 3rem);
  }
`;

interface LargeButtonProps {
  title: string;
  onClick: any;
  isActive?: boolean;
  style?: any;
}

export default function LargeButton({
  title,
  onClick,
  isActive,
  style,
}: LargeButtonProps) {
  return (
    <Wrapper
      type="button"
      onClick={() => onClick()}
      isActive={isActive !== undefined ? isActive : true}
      style={style}
    >
      {title}
    </Wrapper>
  );
}
