import { TouchableOpacity, View, Image, Text } from "react-native";
import CommonHeader from "./Common/CommonHeader";
import React, { useState } from "react";
import Upload from "svg/upload.svg";
import UserBookItemService from "../urlBuilders/UserBookItemUrlBuilder";
import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import useAxios from "hooks/useAxios";
import UserBookItemUrlBuilder from "../urlBuilders/UserBookItemUrlBuilder";
import ImageIdType from "types/ImageIdType";

export type ChoosePhotoProps = {
    onSuccessfullUpload: (imageId: number) => void
}

export default function ChoosePhoto({ onSuccessfullUpload }: ChoosePhotoProps) {

    const [asset, setAsset] = useState<ImagePickerAsset | null>(null);
    const axios = useAxios();

    const getMbValueFromFile = (asset: ImagePickerAsset | null): string => {
        if (asset === null || asset?.fileSize === undefined)
            return "";

        const bytesToMbFormula = 1_048_576;
        return `${(asset.fileSize / bytesToMbFormula).toFixed(2)} MB`
    }

    const handlePhotoPick = () => {
        launchImageLibraryAsync({ allowsMultipleSelection: true, selectionLimit: 1 })
            .then((result) => {
                if (result.canceled)
                    return;

                const image = result.assets[0];
                return handleImageUpload(image).then(result => ({ result, image }))
            }).then((uploadResult) => {
                if (uploadResult !== undefined && uploadResult.result !== null) {
                    setAsset(uploadResult.image)
                    onSuccessfullUpload(uploadResult.result)
                }
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleImageUpload = async (image: ImagePickerAsset): Promise<number | null> => {

        const formData = new FormData();
        const url = UserBookItemUrlBuilder.uploadBookImage();

        if (!image.mimeType || !image.fileName)
            return null;

        formData.append('file', {
            uri: image.uri,
            type: image.mimeType,
            name: image.fileName
        }, null)

        return axios.post<ImageIdType>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data.imageId)

    }

    return (
        <View>
            <CommonHeader text="Wybierz zdjęcie" className="mt-6" />
            <View>
                <TouchableOpacity className="h-36 bg-neutral-100 rounded-lg mt-2 flex items-center justify-center overflow-hidden" onPress={handlePhotoPick}>
                    {asset === null ? <Upload fill={"#D4D4D4"} className="h-10 w-10" /> :
                        <View className="w-full h-full relative">
                            <Image className="h-full w-full" src={asset.uri} />
                            <View className="absolute top-2 right-2 z-2">
                                <Text className="bg-neutral-100 rounded-sm px-2 py-1 font-roboto-bold">{asset.height} x {asset.width}</Text>
                            </View>
                        </View>
                    }
                </TouchableOpacity>
                {asset !== null ?
                    <View className="flex flex-row justify-between mt-2">
                        <Text className="font-roboto-light px-2 py-1">{asset?.fileName}</Text>
                        <Text className="font-roboto-bold bg-neutral-100 px-2 py-1 rounded-md">{getMbValueFromFile(asset)}</Text>
                    </View> : null}
            </View>
        </View>
    )
}