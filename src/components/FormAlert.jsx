import styled from 'styled-components';

const FormAlert = ({ alertMsg }) => {
  return (
    <Wrapper className="form-alert">
      <p>{alertMsg}</p>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  p {
    margin-bottom: 0;
  }
`;

export default FormAlert;
