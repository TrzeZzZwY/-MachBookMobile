import { useContext, useState } from "react";
import { Text, Modal, View, TouchableOpacity, useAnimatedValue, Animated } from "react-native";
import Times from "svg/times.svg";
import ArrowLeft from "svg/arrowLeft.svg";
import CommonHeader from "../Common/CommonHeader";
import CommonInput from "../Common/CommonInput";
import SectionDivider from "../Common/SectionDivider";
import BookService from "../../services/BookService";
import { UserBookItemUploadType } from "../../types/UserBookItemType";
import { UserBookItemStatus } from "../../types/UserBookItemStatus";
import usePopup from "hooks/usePopup/usePopup";
import AddAuthor from "../Popups/AddAuthor/AddAuthor";
import ChooseBook from "../ChooseBook";
import ChooseAuthor from "../ChooseAuthor";
import ChoosePhoto from "../ChoosePhoto";
import UserBookContext from "../../contexts/UserBookContext/UserBookContext";
import UserBookItemService from "services/UserBookItemService";

export type AddBookModalProps = {
    isOpen: boolean,
    close: () => void
}

export default function AddBookModal({ isOpen, close }: AddBookModalProps) {

    const [title, setTitle] = useState<null | string>(null);
    const [autorId, setAuthorId] = useState<null | number>(null);
    const [imageId, setImageId] = useState<number | null>(null);
    const [bookId, setBookId] = useState<number | null>(null);

    
    const {setData} = useContext(UserBookContext);


    const [isViewSwapped, swapView] = useState<boolean>(false);

    const [secondPickerBoxHeight, setSecondPickerBoxHeight] = useState<number>(0);
    const [firstPickerBoxHeight, setFirstPickerBoxHeight] = useState<number>(140);

    const [isPopupOpen, openPopup, closePopup, Popup] = usePopup();


    const animate = useAnimatedValue(0);
    const heightAnimation = useAnimatedValue(firstPickerBoxHeight);
    const buttonAnimation = useAnimatedValue(0);


    const handleTitleChange = (text: string) => {
        setTitle(text);
    }

    const handleBookCreation = () => {
        if (!title || !autorId)
            return;

        BookService.createBook(title, autorId)
            .then(() => handleViewSwap(false))
            .catch(console.log)
    }

    const handleUserBookItemCreation = () => {
        if (!title || !bookId || !imageId)
            return;

        const userBookItem: UserBookItemUploadType = {
            userId: 1,
            status: UserBookItemStatus[UserBookItemStatus.ActivePublic] as keyof typeof UserBookItemStatus,
            description: title,
            bookReferenceId: bookId,
            imageId: imageId
        }

        UserBookItemService
            .createUserBookItem(userBookItem)
            .then(() =>  UserBookItemService.getUserBooks(1,50, true))
            .then((result) => {
                close();
                setData(result.items);
            }).catch(console.log)
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

        Animated.timing(buttonAnimation, {
            toValue: swap ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();

        swapView(swap);
    }

    const manageWindowsClose = () => {
        isPopupOpen ?
            close :
            isViewSwapped ? handleViewSwap(false) : close()
    }

    return <Modal visible={isOpen} onRequestClose={() => manageWindowsClose()} className="relative">
        <View className="px-5">
            <View className="flex flex-row justify-between mt-5">
                <Animated.View style={{ opacity: buttonAnimation }}>
                    <TouchableOpacity onPress={() => handleViewSwap(false)} className="h-10 rounded-md border border-3 bg-neutral-900 flex flex-row items-center justify-center px-4">
                        <ArrowLeft className="w-5 h-5 mr-2" fill={'white'} />
                        <Text className="font-roboto-bold color-white">Powrót</Text>
                    </TouchableOpacity>
                </Animated.View>
                <View>
                    <TouchableOpacity onPress={close} className="h-10 w-10 rounded-md border border-3 border-neutral-200 flex items-center justify-center">
                        <Times className="w-3 h-3 p-3" fill={'#D4D4D4'} />
                    </TouchableOpacity>
                </View>
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
                            <View className="mt-5">
                                <ChooseBook sideButtonAction={() => handleViewSwap(true)} onChange={(item) => item ? setBookId(item.id) : setBookId(null)} />
                            </View>
                        </View>
                        <View className="w-[50%]" onLayout={(event) => setSecondPickerBoxHeight(event.nativeEvent.layout.height)}>
                            <View className="mt-5">
                                <ChooseAuthor sideButtonAction={() => openPopup("Dodaj autora")} onChange={(item) => item ? setAuthorId(item.id) : setAuthorId(null)} />
                            </View>
                            <View className="mt-5">
                                <CommonHeader text="Podaj tytuł książki" />
                                <CommonInput onChange={handleTitleChange} className="mt-2" />
                            </View>
                            <SectionDivider className="my-2" />
                            <TouchableOpacity onPress={handleBookCreation} className="w-full flex flex-row items-center justify-center bg-neutral-900 px-2 py-3 rounded-md">
                                <Text className="color-white font-roboto-bold mr-2 text-md">Dodaj nową książkę</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
            <View>
                <ChoosePhoto onSuccessfullUpload={setImageId} />
            </View>
            <View>
                <CommonHeader text="Podaj tytuł ogłoszenia" className="mt-6" />
                <View className="mt-2">
                    <CommonInput onChange={(string) => setTitle(string)} />
                </View>
                <SectionDivider className="my-2" />
                <TouchableOpacity onPress={handleUserBookItemCreation} className="w-full flex flex-row items-center justify-center bg-neutral-900 px-2 py-3 rounded-md">
                    <Text className="color-white font-roboto-bold mr-2 text-md">Dodaj nową książkę</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Popup header="Dodaj autora">
            <AddAuthor onCreate={closePopup} />
        </Popup>
    </Modal>
}