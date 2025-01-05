import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, Modal, Image, View, TouchableOpacity, TextInput, BackHandler, useAnimatedValue, Animated } from "react-native";
import Times from "svg/times.svg";
import CommonHeader from "../Common/CommonHeader";
import CommonInput from "../Common/CommonInput";
import SectionDivider from "../Common/SectionDivider";
import SearchablePicker from "../Common/SearchablePicker";
import AuthorService from "../../services/AuthorService";
import BookService from "../../services/BookService";
import BookType from "../../types/BookType";
import { AuthorType } from "../../types/AuthorType";
import Upload from 'svg/upload.svg';
import AddAuthorPopup from "../Popups/AddAuthorPopup";

export type AddBookModalProps = {
    isOpen: boolean,
    close: () => void
}

export default function AddBookModal({ isOpen, close }: AddBookModalProps) {

    const [asset, setAsset] = useState<ImagePickerAsset | null>(null);
    const [title, setTitle] = useState<null | string>(null);
    const [autorId, setAuthorId] = useState<null | number>(null);
    const [isViewSwapped, swapView] = useState<boolean>(false);
    const [secondPickerBoxHeight, setSecondPickerBoxHeight] = useState<number>(0);
    const [firstPickerBoxHeight, setFirstPickerBoxHeight] = useState<number>(140);
    const [isPopupOpen,setOpenPopup] = useState<boolean>(false);

    const animate = useAnimatedValue(0);
    const heightAnimation = useAnimatedValue(firstPickerBoxHeight);

    const handlePhotoPick = async () => {
        const result = await launchImageLibraryAsync();
        if (result.canceled)
            return;

        setAsset(result.assets[0])
    }

    const displayAuthors = (authors: AuthorType[]): string => {
        if (authors === null)
            return "";
        return authors.map(a => `${a.firstName} ${a.lastName}`).join(',');
    }

    const handleTitleChange = (text: string) => {
        setTitle(text);
    }

    const handleAuthorChange = (author: AuthorType | null) => {
        setAuthorId(author ? author.id : null);
    }

    const handleViewSwap = (swap: boolean) => {

        if (firstPickerBoxHeight === null || secondPickerBoxHeight === null)
            return;

        Animated.timing(heightAnimation, {
            toValue: swap ? secondPickerBoxHeight : firstPickerBoxHeight,
            duration: 250,
            useNativeDriver: false,
        }).start()

        Animated.timing(animate, {
            toValue: swap ? 100 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();

        swapView(swap);
    }

    const getMbValueFromFile = (asset: ImagePickerAsset | null): string => {

        if (asset === null || asset?.fileSize === undefined)
            return "";

        const bytesToMbFormula = 1_048_576;
        return `${(asset.fileSize / bytesToMbFormula).toFixed(2)} MB`
    }

    const renderDropdownItemForAuthor = (item: AuthorType): JSX.Element => {
        return <View className="h-10 my-1 px-3 flex flex-row justify-between items-center">
            <View>
                <View><Text>{item.label}</Text></View>
                <View><Text className="font-roboto-light text-xs">{item.country}</Text></View>
            </View>

            <View className="bg-neutral-100 py-1 px-2 rounded-md">
                <Text className="font-roboto-bold text-neutral-800">{item.yearOfBirth}</Text>
            </View>

        </View>
    }

    const renderDropdownItemForBook = (item: BookType): JSX.Element => {
        return <View className="h-10 my-1 px-3 flex flex-row justify-between items-center">
            <View>
                <View><Text>{item.label}</Text></View>
                <View><Text className="font-roboto-light text-xs">{displayAuthors(item.authors)}</Text></View>
            </View>
        </View>
    }

    const manageWindowsClose = () => {
        isPopupOpen ?
            setOpenPopup(false) :
                isViewSwapped ? handleViewSwap(false) : close()
    }

    return <Modal visible={isOpen} onRequestClose={() => manageWindowsClose()} className="relative">
        <View className="px-5">
            <View className="absolute z-10 top-5 right-5">
                <TouchableOpacity onPress={close} className="p-2 rounded-md border border-3 border-neutral-200">
                    <Times className="w-3 h-3 p-3" fill={'#D4D4D4'} />
                </TouchableOpacity>
            </View>
            <Animated.View className="w-[100%] overflow-hidden" style={{ height: heightAnimation }}>
                <Animated.View className={`absolute w-[200%]`} style={{
                    left: animate.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '-100%']
                    })
                }}>
                    <View className="flex flex-row w-[100%] items-start">
                        <View className="w-[50%] h-[auto]" onLayout={(event) => setFirstPickerBoxHeight(event.nativeEvent.layout.height)}>
                            <View>
                                <View className="mt-16">
                                    <CommonHeader text="Wybierz książkę" />
                                    <SearchablePicker
                                        sideButtonAction={() => handleViewSwap(true)}
                                        onChange={() => null}
                                        dropdownItemRenderer={renderDropdownItemForBook}
                                        service={new BookService()}
                                        placeholder="Wybierz książkę"
                                        searchPlaceholder="Wyszukaj książkę..." />
                                </View>
                            </View>
                        </View>
                        <View className="w-[50%]" onLayout={(event) => setSecondPickerBoxHeight(event.nativeEvent.layout.height)}>
                            <View>
                                <View className="mt-16">
                                    <CommonHeader text="Wybierz autora książki" />
                                    <SearchablePicker
                                        sideButtonAction={() => setOpenPopup(true)}
                                        onChange={handleAuthorChange}
                                        dropdownItemRenderer={renderDropdownItemForAuthor}
                                        service={new AuthorService()}
                                        placeholder="Wybierz autora"
                                        searchPlaceholder="Wyszukaj autora..." />
                                </View>
                                <SectionDivider className="my-6" />
                                <View>
                                    <CommonHeader text="Podaj tytuł książki" />
                                    <CommonInput onChange={handleTitleChange} className="mt-2" />
                                </View>
                                <SectionDivider className="my-6" />
                                <TouchableOpacity onPress={() => null} className="w-full flex flex-row items-center justify-center bg-neutral-900 px-2 py-3 rounded-md">
                                    <Text className="color-white font-roboto-bold mr-2 text-md">Dodaj nową książkę</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>

            <View>
                <CommonHeader text="Wybierz zdjęcie" className="mt-6" />
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
        <AddAuthorPopup isOpen={isPopupOpen} close={() => setOpenPopup(false)} onAdd={(author) => null}/>

        {/* <Button onPress={handlePhotoPick} title="Open Library" /> */}

    </Modal>
}