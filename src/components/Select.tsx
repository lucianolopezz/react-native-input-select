import {
	type ListRenderItemInfo,
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	View,
} from "react-native";

import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetFlatList,
	type BottomSheetBackdropProps,
	type BottomSheetProps,
} from "@gorhom/bottom-sheet";
import _omit from "lodash/omit";
import { Check, ChevronDown } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { Pressable, RectButton } from "react-native-gesture-handler";

interface BaseProps {
	id: number;
}

interface SelectProps<T> extends TextInputProps {
	items: T[];
	modalProps?: Omit<BottomSheetProps, "children">;
	onSelectValue: (item: T) => void;
	getOptionLabel?: (item: T) => string;
}

export function Select<T extends BaseProps>({
	getOptionLabel = (item) => String(item),
	items,
	onSelectValue,
	value,
	...props
}: SelectProps<T>) {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const openBottomSheet = () => {
		bottomSheetRef.current?.expand();
	};

	const handleSelectValue = useCallback(
		(item: T) => {
			onSelectValue(item);
			bottomSheetRef.current?.close();
		},
		[onSelectValue],
	);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				opacity={0.5}
				disappearsOnIndex={-1}
				appearsOnIndex={1}
			/>
		),
		[],
	);

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<T>) => (
			<RectButton onPress={() => handleSelectValue(item)}>
				<View style={styles.contentItem}>
					<Text>{getOptionLabel(item)}</Text>
					{value === getOptionLabel(item) && <Check size={24} color="green" />}
				</View>
			</RectButton>
		),
		[getOptionLabel, handleSelectValue, value],
	);

	return (
		<>
			<Pressable onPress={openBottomSheet}>
				<View style={styles.inputWrapper}>
					<TextInput
						style={styles.input}
						editable={false}
						value={value}
						{..._omit(props, ["modalProps"])}
					/>
					<ChevronDown style={styles.icon} size={24} color="#ccc" />
				</View>
			</Pressable>

			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				backdropComponent={renderBackdrop}
				enablePanDownToClose
				{...props.modalProps}
			>
				<BottomSheetFlatList
					data={items}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
				/>
			</BottomSheet>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	inputWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	input: {
		width: "100%",
		height: 56,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#ccc",
		borderRadius: 4,
		paddingHorizontal: 20,
	},
	contentItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: "#ccc",
		padding: 15,
	},
	icon: {
		position: "absolute",
		right: 20,
	},
});
