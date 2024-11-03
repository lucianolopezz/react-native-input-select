import { StyleSheet, View } from "react-native";

import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Select } from "./src/components/Select";

const FRUITS = [
	{ id: 1, name: "Apple 🍎" },
	{ id: 2, name: "Banana 🍌" },
	{ id: 3, name: "Orange 🍊" },
	{ id: 4, name: "Grape 🍇" },
	{ id: 5, name: "Strawberry 🍓" },
	{ id: 6, name: "Pear 🍐" },
	{ id: 7, name: "Pineapple 🍍" },
	{ id: 8, name: "Watermelon 🍉" },
	{ id: 9, name: "Kiwi 🥝" },
	{ id: 10, name: "Cherry 🍒" },
];

type Fruit = (typeof FRUITS)[number];

function App() {
	const [fruit, setFruit] = useState<Fruit | null>(null);

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.content}>
				<Select
					placeholder="Selecione uma fruta"
					items={FRUITS}
					onSelectValue={(item) => setFruit(item)}
					getOptionLabel={(item) => item.name}
					value={fruit?.name}
					modalProps={{
						snapPoints: ["40%"],
						enableDynamicSizing: false,
					}}
				/>
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});

export default App;
