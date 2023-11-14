/**
 * TIPS AND TRICKS FOR CONTRIBUTORS
 * 1) Memorize the layering of body parts. Hands are higher than arms, feet higher than legs
 * 2) Generally you will want to avoid lower pri items on the same layer sticking out on seams if your object is skintight.
 * In general, this is accomplished by having higher priority items cover more of the original
 */

AddModel({
	Name: "BalletHeels",
	Folder: "Heels",
	TopLevel: true,
	Restraint: true,
	Categories: ["Restraints", "Heels"],
	AddPose: ["Ballet"],
	Layers: ToLayerMap([
		{ Name: "BalletLeft", Layer: "ShoeLeft", Pri: 50, // Bondage overrides plate mail
			HideWhenOverridden: true,
			InheritColor: "Shoe",
			GlobalDefaultOverride: ToMap(["KneelClosed", "Hogtie"]),
			Poses: ToMap([...CALFLEFTPOSES]),
			DisplacementSprite: "Ballet",
			DisplaceAmount: 50,
			DisplaceLayers: ToMap(["Heels"]),
			EraseInvariant: true,
			EraseMorph: {Spread: "Spread"},
			EraseSprite: "BalletErase",
			EraseAmount: 100,
			EraseLayers: ToMap(["Heels"]),
		},
		{ Name: "BalletRight", Layer: "ShoeRight", Pri: 50, // Bondage overrides plate mail
			HideWhenOverridden: true,
			InheritColor: "Shoe",
			Poses: ToMap([...CALFRIGHTPOSES]),
			GlobalDefaultOverride: ToMap(["KneelClosed", "Hogtie"]),
			SwapLayerPose: {Kneel: "ShoeRightKneel"},
			EraseInvariant: true,
			EraseMorph: {Closed: "Closed"},
			EraseSprite: "BalletRightErase",
			EraseAmount: 100,
			EraseLayers: ToMap(["HeelRight"]),
		},


		{ Name: "BalletSoleLeft", Layer: "ShoeLeft", Pri: 50.1,
			HideWhenOverridden: true,
			InheritColor: "Sole",
			GlobalDefaultOverride: ToMap(["KneelClosed", "Hogtie"]),
			Poses: ToMap([...CALFLEFTPOSES]),
			NoOverride: true,
			TieToLayer: "BalletLeft",
		},
		{ Name: "BalletSoleRight", Layer: "ShoeRight", Pri: 50.1,
			HideWhenOverridden: true,
			InheritColor: "Sole",
			Poses: ToMap([...CALFRIGHTPOSES]),
			GlobalDefaultOverride: ToMap(["KneelClosed", "Hogtie"]),
			SwapLayerPose: {Kneel: "ShoeRightKneel"},
			NoOverride: true,
			TieToLayer: "BalletRight",
		},


		{ Name: "BalletLaceLeft", Layer: "ShoeLeft", Pri: 50.2,
			HideWhenOverridden: true,
			InheritColor: "Laces",
			Poses: ToMap(["Closed", "Spread"]),
			NoOverride: true,
			TieToLayer: "BalletLeft",
		},
		{ Name: "BalletLaceRight", Layer: "ShoeRight", Pri: 50.2,
			HideWhenOverridden: true,
			InheritColor: "Laces",
			Poses: ToMap(["Closed", "Spread"]),
			NoOverride: true,
			TieToLayer: "BalletRight",
		},
	])
});

