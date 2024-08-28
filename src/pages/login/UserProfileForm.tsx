import styled from "@emotion/native";
import { Theme } from "../../styles/theme";
import { CardBackgroundImg, PencilImg } from "../../assets/assets";
import { useState } from "react";
import ImagePickerComponent from "../../components/common/ImagePicker";

export default function UserProfileForm() {
  const [selectedBackgroundImage, setSelectedBackgroudImage] = useState<string | null>();

  function takeImageHandler(imageUri: string) {
    setSelectedBackgroudImage(imageUri);
  }

  let backgroundImagePreview = <BackgroundImage source={CardBackgroundImg} />;

  if (selectedBackgroundImage) {
    backgroundImagePreview = <BackgroundImage source={{ uri: selectedBackgroundImage }} />;
  }

  return (
    <RootContainer>
      <CardContainer>
        {backgroundImagePreview}
        <ImagePickerComponent onTakeImage={takeImageHandler}>
          <EditIcon source={PencilImg} />
        </ImagePickerComponent>
      </CardContainer>
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
  background-color: ${Theme.colors.White};
  padding-top: 148px;
  padding-bottom: 24px;
  padding-horizontal: 16px;
  align-items: center;
`;

const CardContainer = styled.View`
  position: relative;
  width: 328px;
  height: 200px;
  border-radius: 16px;
`;

const EditIcon = styled.Image`
  width: 32px;
  height: 32px;
`;

const BackgroundImage = styled.Image`
  width: 328px;
  height: 200px;
`;
