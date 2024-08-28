import { Alert, Pressable } from "react-native";
import styled from "@emotion/native";
import { ReactNode, useState } from "react";
import PermissionUtil from "../../utils/PermissionUtil";
import { launchImageLibrary } from "react-native-image-picker";

interface ImagePickerProps {
  onTakeImage: (text: string) => void;
  children: ReactNode;
}

export default function ImagePickerComponent({ onTakeImage, children }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<object | null>(null);

  async function takeImageHandler() {
    const hasPermission = await PermissionUtil.cmmReqGalleryPermission();

    if (!hasPermission) {
      Alert.alert("갤러리 접근 허용(필수)", "갤러리 접근 권한을 허용해주세요.");
      return;
    }

    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.error("ImagePicker Error: ", response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          onTakeImage(asset.uri);
        } else {
          console.error("Image URI is undefined");
        }
      } else {
        console.log("No image selected");
      }
    });
  }

  return (
    <IconContainer>
      <Pressable onPress={takeImageHandler}>{children}</Pressable>
    </IconContainer>
  );
}

const IconContainer = styled.View`
  position: absolute;
  width: 32px;
  height: 32px;
  bottom: 12px;
  right: 16px;
`;

const EditIcon = styled.Image`
  width: 32px;
  height: 32px;
`;
