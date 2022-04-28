import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import { Pressable, Text } from "react-native";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 24px;
`;

const CeoLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <Container>
      <StyledText>
        사용자세요?
        <Pressable onPress={() => setIsUser((prev) => !prev)}>
          <Text>사용자 로그인</Text>
        </Pressable>
      </StyledText>
    </Container>
  );
};

export default CeoLogin;
