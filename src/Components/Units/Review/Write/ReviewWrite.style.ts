import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const SubTitleWrapper = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 5px;
  margin-top: 2.5rem;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

interface TagStyleProps {
  isSelected: boolean;
}

export const Detail = styled.span`
  margin-right: 0.5rem;
  padding: 0.438rem 1rem;
  border: 1px solid #767676;
  border-color: ${(props: TagStyleProps) =>
    props.isSelected ? "#304FFE" : "#767676"};
  border-radius: 6.25rem;
  margin-right: 0.813rem;
  margin-bottom: 0.813rem;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#304FFE12" : "#ffffff")};
`;

export const ReviewTextField = styled.textarea`
  width: 100%;
  height: 10rem;
  border: 1px solid gray;
  border-radius: 1rem;
  margin-top: 1.5rem;
  padding: 1.25rem;
  font-size: 0.875rem;
`;
